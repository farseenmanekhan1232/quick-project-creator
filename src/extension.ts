import * as vscode from "vscode";
import { projectList } from "./projectList";
import { ProjectTemplate } from "./types";
import { ProjectCreatorProvider, ProjectItem } from "./views";
import {
  addCustomTemplate,
  createProject,
  deleteAllCustomTemplates,
} from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const projectCreatorProvider = new ProjectCreatorProvider(
    context.extensionUri,
    context
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ProjectCreatorProvider.viewType,
      projectCreatorProvider
    )
  );

  vscode.window.registerTreeDataProvider(
    "quickProjectCreator.projectList",
    projectCreatorProvider
  );

  let createProjectDisposable = vscode.commands.registerCommand(
    "quickProjectCreator.createProject",
    (projectItem: ProjectItem | ProjectTemplate) =>
      createProject(projectItem, context)
  );
  let addCustomTemplateDisposable = vscode.commands.registerCommand(
    "quickProjectCreator.addCustomTemplate",
    () => addCustomTemplate(context, projectCreatorProvider)
  );
  let deleteAllCustomTemplatesDisposable = vscode.commands.registerCommand(
    "quickProjectCreator.deleteAllCustomTemplates",
    () => deleteAllCustomTemplates(projectCreatorProvider)
  );

  let showQuickPickDisposable = vscode.commands.registerCommand(
    "quickProjectCreator.showQuickPick",
    () => {
      const items = projectList.flatMap((category) =>
        category.children.map((project) => ({
          label: project.label,
          description: category.label,
          project: project,
        }))
      );

      vscode.window
        .showQuickPick(items, {
          placeHolder: "Select a project to create",
        })
        .then((selection) => {
          if (selection) {
            createProject(selection.project, context);
          }
        });
    }
  );

  context.subscriptions.push(
    createProjectDisposable,
    addCustomTemplateDisposable,
    deleteAllCustomTemplatesDisposable,
    showQuickPickDisposable
  );

  projectCreatorProvider.loadCustomTemplates();
}

export function deactivate() {}
