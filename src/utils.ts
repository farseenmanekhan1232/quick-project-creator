import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

import { CustomTemplate, ProjectCategory, ProjectTemplate } from "./types";

import { ProjectCreatorProvider, ProjectItem } from "./views";
import { projectList } from "./projectList";

export async function createCustomProject(
  customTemplate: CustomTemplate,
  basePath: string,
  progress: vscode.Progress<{ increment?: number; message?: string }>
) {
  const totalProjects = customTemplate.projects.length;
  const terminals: vscode.Terminal[] = [];

  for (let i = 0; i < totalProjects; i++) {
    const project = customTemplate.projects[i];
    const projectPath = path.join(basePath, project.id);

    fs.mkdirSync(projectPath, { recursive: true });

    let terminal: vscode.Terminal;
    if (i === 0) {
      terminal = vscode.window.createTerminal({
        name: `Quick Project Creator - ${project.label}`,
        cwd: projectPath,
      });
    } else {
      await vscode.commands.executeCommand("workbench.action.terminal.split");
      terminal = vscode.window.activeTerminal!;
      await vscode.commands.executeCommand(
        "workbench.action.terminal.renameWithArg",
        {
          name: `Quick Project Creator - ${project.label}`,
        }
      );
    }
    terminals.push(terminal);
    terminal.show(true);

    terminal.sendText(
      `cd "${projectPath}" && ${project.command} && echo "Command execution finished" && exit`,
      true
    );
  }

  // Wait for all terminals to close
  await Promise.all(
    terminals.map(
      (terminal) =>
        new Promise<void>((resolve) => {
          const disposable = vscode.window.onDidCloseTerminal(
            (closedTerminal) => {
              if (closedTerminal === terminal) {
                disposable.dispose();
                resolve();
              }
            }
          );
        })
    )
  );

  for (let i = 0; i < totalProjects; i++) {
    progress.report({
      increment: 100 / totalProjects,
      message: `Created ${customTemplate.projects[i].label} project (${
        i + 1
      }/${totalProjects})`,
    });
  }
}

export async function createProject(
  projectItem: ProjectItem | ProjectTemplate,
  context: vscode.ExtensionContext
) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage(
      "Please open a folder before creating a project."
    );
    return;
  }

  let projectName: string | undefined;
  let projectPath: string;

  // Always ask for a project name, regardless of whether it's a custom template or not
  projectName = await vscode.window.showInputBox({
    prompt: `Enter the name for your ${projectItem.label} project`,
    placeHolder: `my-${projectItem.label
      .toLowerCase()
      .replace(/\s/g, "-")}-project`,
  });

  if (!projectName) {
    return;
  }

  projectPath = path.join(workspaceFolders[0].uri.fsPath, projectName);

  if (fs.existsSync(projectPath)) {
    const overwrite = await vscode.window.showWarningMessage(
      `A directory named "${projectName}" already exists. Do you want to overwrite it?`,
      "Yes",
      "No"
    );
    if (overwrite !== "Yes") {
      return;
    }
    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  fs.mkdirSync(projectPath, { recursive: true });

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Creating ${projectItem.label} project`,
      cancellable: false,
    },
    async (progress) => {
      try {
        if (
          "contextValue" in projectItem &&
          projectItem.contextValue === "custom"
        ) {
          if (projectItem.customTemplate) {
            await createCustomProject(
              projectItem.customTemplate,
              projectPath,
              progress
            );
          } else {
            throw new Error(
              `Custom template "${projectItem.label}" not found.`
            );
          }
        } else if ("command" in projectItem) {
          await createSingleProject(projectItem, projectPath);
          progress.report({
            increment: 100,
            message: "Project created successfully.",
          });
        } else {
          throw new Error(`Unable to create project: ${projectItem.label}`);
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(
          `Failed to create project: ${error.message}`
        );
      }
    }
  );

  vscode.window.showInformationMessage(
    `${projectItem.label} project "${projectName}" creation process has completed.`
  );
}

export async function createSingleProject(
  projectItem: ProjectItem | ProjectTemplate,
  projectPath: string
) {
  const terminal = vscode.window.createTerminal({
    name: `Quick Project Creator - ${projectItem.label}`,
    cwd: projectPath,
  });

  terminal.show(true);
  terminal.sendText(
    `${
      "projectCommand" in projectItem
        ? projectItem.projectCommand
        : projectItem.command
    } && echo "Command execution finished" && exit`,
    true
  );

  await new Promise<void>((resolve, reject) => {
    const disposable = vscode.window.onDidCloseTerminal((closedTerminal) => {
      if (closedTerminal === terminal) {
        disposable.dispose();
        if (closedTerminal.exitStatus?.code === 0) {
          resolve();
        } else {
          reject(
            new Error(
              `Command failed with exit code ${closedTerminal.exitStatus?.code}`
            )
          );
        }
      }
    });
  });
}

export async function addCustomTemplate(
  context: vscode.ExtensionContext,
  provider: ProjectCreatorProvider
) {
  const templateName = await vscode.window.showInputBox({
    prompt: "Enter a name for your custom template",
    placeHolder: "My Custom Template",
  });

  if (!templateName) {
    return;
  }

  const projects: ProjectTemplate[] = [];
  let addMore = true;

  while (addMore) {
    const projectName = await vscode.window.showInputBox({
      prompt: "Enter a name for the project",
      placeHolder: "frontend",
    });

    if (!projectName) {
      break;
    }

    const projectTypes = projectList.flatMap((category: ProjectCategory) =>
      category.children.map((project: ProjectTemplate) => ({
        label: project.label,
        description: project.id,
        project: project,
      }))
    );

    const selectedProject = await vscode.window.showQuickPick(projectTypes, {
      placeHolder: "Select project type",
    });

    if (selectedProject) {
      projects.push({
        id: projectName,
        label: selectedProject.project.label,
        command: selectedProject.project.command,
        icon: selectedProject.project.icon,
      });
    }

    addMore =
      (await vscode.window.showQuickPick(["Yes", "No"], {
        placeHolder: "Add another project to this template?",
      })) === "Yes";
  }

  if (projects.length > 0) {
    const newTemplate: CustomTemplate = { name: templateName, projects };
    provider.addCustomTemplate(newTemplate);
    vscode.window.showInformationMessage(
      `Custom template "${templateName}" has been added.`
    );
  }
}

export async function deleteAllCustomTemplates(
  provider: ProjectCreatorProvider
) {
  const confirmation = await vscode.window.showWarningMessage(
    "Are you sure you want to delete all custom templates?",
    "Yes",
    "No"
  );

  if (confirmation === "Yes") {
    provider.deleteAllCustomTemplates();
    vscode.window.showInformationMessage(
      "All custom templates have been deleted."
    );
  }
}
