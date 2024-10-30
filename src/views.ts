import * as vscode from "vscode";
import { projectList } from "./projectList";
import { CustomTemplate } from "./types";
import { createProject } from "./utils";

export class ProjectCreatorProvider
  implements vscode.WebviewViewProvider, vscode.TreeDataProvider<ProjectItem>
{
  public static readonly viewType = "quickProjectCreator.projectList";

  private _view?: vscode.WebviewView;
  private _onDidChangeTreeData: vscode.EventEmitter<
    ProjectItem | undefined | null | void
  > = new vscode.EventEmitter<ProjectItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ProjectItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  public projects: ProjectItem[];
  private customTemplates: CustomTemplate[] = [];

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private context: vscode.ExtensionContext
  ) {
    this.projects = this.initializeProjects();
    this.loadCustomTemplates();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "newProject":
          vscode.commands.executeCommand("quickProjectCreator.showQuickPick");
          break;
        case "newBoilerplate":
          vscode.commands.executeCommand(
            "quickProjectCreator.addCustomTemplate"
          );
          break;
        case "useTemplate":
          this.useCustomTemplate(data.templateName);
          break;
        case "deleteTemplate":
          this.deleteCustomTemplate(data.templateName);
          break;
        case "deleteAllTemplates":
          this.deleteAllCustomTemplatesWithConfirmation();
          break;
      }
    });
  }

  private initializeProjects(): ProjectItem[] {
    return projectList.map(
      (category) =>
        new ProjectItem(
          category.id,
          category.label,
          vscode.TreeItemCollapsibleState.Collapsed,
          undefined,
          category.children.map(
            (project) =>
              new ProjectItem(
                project.id,
                project.label,
                vscode.TreeItemCollapsibleState.None,
                undefined,
                [],
                project.command,
                undefined,
                project.icon
              )
          )
        )
    );
  }

  public loadCustomTemplates() {
    this.customTemplates = this.context.globalState.get<CustomTemplate[]>(
      "customTemplates",
      []
    );
  }

  private saveCustomTemplates() {
    this.context.globalState.update("customTemplates", this.customTemplates);
  }

  public addCustomTemplate(template: CustomTemplate) {
    const existingTemplate = this.customTemplates.find(
      (t) => t.name === template.name
    );
    if (existingTemplate) {
      vscode.window.showErrorMessage(
        `A template named "${template.name}" already exists.`
      );
      return;
    }
    this.customTemplates.push(template);
    this.saveCustomTemplates();
    this.refresh();
  }

  public getCustomTemplates(): CustomTemplate[] {
    return this.customTemplates;
  }

  public deleteAllCustomTemplates() {
    this.customTemplates = [];
    this.saveCustomTemplates();
    this.refresh();
  }
  private _getHtmlForWebview(webview: vscode.Webview) {
    const templateList = this.customTemplates
      .map(
        (template) => `
      <li class="flex items-center justify-between py-2 ">
        <button class="template-button  flex-grow text-left" data-template="${template.name}" 
        style="padding-top:0.5rem; padding-bottom:0.5rem">
          ${template.name}
        </button>
        <button class="delete-button ml-2 p-1" data-template="${template.name}" aria-label="Delete ${template.name}">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </button>
      </li>
    `
      )
      .join("");

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quick Project Creator</title>
        <style>
            :root {
                --background: #ffffff;
                --foreground: #09090b;
                --card: #ffffff;
                --card-foreground: #09090b;
                --popover: #ffffff;
                --popover-foreground: #09090b;
                --primary: #18181b;
                --primary-foreground: #fafafa;
                --secondary: #f4f4f5;
                --secondary-foreground: #18181b;
                --muted: #f4f4f5;
                --muted-foreground: #71717a;
                --accent: #f4f4f5;
                --accent-foreground: #18181b;
                --destructive: #ef4444;
                --destructive-foreground: #fafafa;
                --border: #e4e4e7;
                --input: #e4e4e7;
                --ring: #18181b;
                --radius: 0.5rem;
            }

            .dark {
                --background: #09090b;
                --foreground: #fafafa;
                --card: #09090b;
                --card-foreground: #fafafa;
                --popover: #09090b;
                --popover-foreground: #fafafa;
                --primary: #fafafa;
                --primary-foreground: #18181b;
                --secondary: #27272a;
                --secondary-foreground: #fafafa;
                --muted: #27272a;
                --muted-foreground: #a1a1aa;
                --accent: #27272a;
                --accent-foreground: #fafafa;
                --destructive: #7f1d1d;
                --destructive-foreground: #fafafa;
                --border: #27272a;
                --input: #27272a;
                --ring: #d4d4d8;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                padding: 1.5rem;
                color: var(--foreground);
                background-color: transparent;
                font-size: 0.875rem;
                line-height: 1.5;
            }

            .container {
                max-width: 28rem;
                margin: 0 auto;
            }

            button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius);
                font-size: 0.875rem;
                font-weight: 500;
                height: 2.5rem;
                padding-left: 1rem;
                padding-right: 1rem;
                transition: all 0.2s;
                cursor: pointer;
                border: 1px solid var(--border);
            }

            .primary-button {
                background-color: var(--primary);
                color: var(--primary-foreground);
            }

            .primary-button:hover {
                opacity: 0.9;
            }

            .secondary-button {
                background-color: var(--secondary);
                color: var(--secondary-foreground);
            }

       

            h2 {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 1.5rem 0 1rem;
            }

            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }

            .template-button {
                background-color: transparent;
                color: var(--foreground);
                border: none;
                height: 20px;
                padding:2rem;

            }


            .delete-button {
                color: var(--muted-foreground);
                background-color: transparent;
                border: none;
                padding: 0;
                height: auto;
            }

            .delete-button:hover {
                color: var(--destructive);
            }

            #deleteAllButton {
                color: var(--destructive);
                background-color: transparent;
                border: 1px solid var(--destructive);
                margin-top: 1rem;
            }

            #deleteAllButton:hover {
                background-color: var(--destructive);
                color: var(--destructive-foreground);
            }

            .empty-state {
                text-align: center;
                color: var(--muted-foreground);
                margin-top: 1.5rem;
            }

            #actionButtons {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .flex {
                display: flex;
            }

            .items-center {
                align-items: center;
            }

            .justify-between {
                justify-content: space-between;
            }

            .py-2 {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }

            .flex-grow {
                flex-grow: 1;
            }

            .text-left {
                text-align: left;
            }

            .ml-2 {
                margin-left: 0.5rem;
            }

            .p-1 {
                padding: 0.25rem;
            }
        </style>
    </head>
    <body class='dark'>
        <div class="container">
            <div id="actionButtons">
                <button id="newProject" class="primary-button">
                    New Project
                </button>
                <button id="newBoilerplate" class="secondary-button">
                    New Boilerplate
                </button>
            </div>
            
            <h2>Custom Boilerplates</h2>
            ${
              this.customTemplates.length > 0
                ? `
                <ul id="templateList" >
                    ${templateList}
                </ul>
                <button id="deleteAllButton" class="secondary-button">
                    Delete All Templates
                </button>
            `
                : `
                <div class="empty-state">
                    <p>No custom boilerplates yet. Create one to get started!</p>
                </div>
            `
            }
        </div>

        <script>
            const vscode = acquireVsCodeApi();
            
            document.getElementById('newProject').addEventListener('click', () => {
                vscode.postMessage({ type: 'newProject' });
            });
            
            document.getElementById('newBoilerplate').addEventListener('click', () => {
                vscode.postMessage({ type: 'newBoilerplate' });
            });
            
            document.querySelectorAll('.template-button').forEach(button => {
                button.addEventListener('click', () => {
                    vscode.postMessage({ 
                        type: 'useTemplate', 
                        templateName: button.dataset.template 
                    });
                });
            });

            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', () => {
                    vscode.postMessage({ 
                        type: 'deleteTemplate', 
                        templateName: button.dataset.template 
                    });
                });
            });

            const deleteAllButton = document.getElementById('deleteAllButton');
            if (deleteAllButton) {
                deleteAllButton.addEventListener('click', () => {
                    vscode.postMessage({ type: 'deleteAllTemplates' });
                });
            }
        </script>
    </body>
    </html>
  `;
  }

  private async useCustomTemplate(templateName: string) {
    const selectedTemplate = this.customTemplates.find(
      (template) => template.name === templateName
    );

    if (selectedTemplate) {
      await createProject(
        {
          id: selectedTemplate.name,
          label: selectedTemplate.name,
          command: "",
          icon: "code",
          contextValue: "custom",
          customTemplate: selectedTemplate,
        },
        this.context
      );
    }
  }

  public refresh() {
    this._onDidChangeTreeData.fire();
    if (this._view) {
      this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    }
  }
  public deleteCustomTemplate(templateName: string) {
    this.customTemplates = this.customTemplates.filter(
      (t) => t.name !== templateName
    );
    this.saveCustomTemplates();
    this.refresh();
  }

  public async deleteAllCustomTemplatesWithConfirmation() {
    const confirmation = await vscode.window.showWarningMessage(
      "Are you sure you want to delete all custom templates?",
      "Yes",
      "No"
    );

    if (confirmation === "Yes") {
      this.deleteAllCustomTemplates();
      vscode.window.showInformationMessage(
        "All custom templates have been deleted."
      );
    }
  }

  // TreeDataProvider methods
  getTreeItem(element: ProjectItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ProjectItem): vscode.ProviderResult<ProjectItem[]> {
    if (element === undefined) {
      const customTemplateItems = this.customTemplates.map(
        (template) =>
          new ProjectItem(
            template.name,
            template.name,
            vscode.TreeItemCollapsibleState.None,
            "custom",
            [],
            undefined,
            template
          )
      );
      const customTemplatesFolder = new ProjectItem(
        "custom-templates",
        "Custom Templates",
        vscode.TreeItemCollapsibleState.Expanded,
        undefined,
        customTemplateItems
      );
      return [
        customTemplatesFolder,
        new ProjectItem(
          "add-custom-template",
          "Add Custom Template",
          vscode.TreeItemCollapsibleState.None,
          "add"
        ),
        new ProjectItem(
          "delete-all-custom-templates",
          "Delete All Custom Templates",
          vscode.TreeItemCollapsibleState.None,
          "delete-all"
        ),
        ...this.projects,
      ];
    }
    return element.children;
  }
}

export class ProjectItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly contextValue?: string,
    public readonly children: ProjectItem[] = [],
    public readonly projectCommand?: string,
    public readonly customTemplate?: CustomTemplate,
    public readonly iconName?: string
  ) {
    super(label, collapsibleState);

    this.iconPath = new vscode.ThemeIcon(iconName || "code");

    if (contextValue === "add") {
      this.command = {
        command: "quickProjectCreator.addCustomTemplate",
        title: "Add Custom Template",
        arguments: [this],
      };
    } else if (contextValue === "delete-all") {
      this.command = {
        command: "quickProjectCreator.deleteAllCustomTemplates",
        title: "Delete All Custom Templates",
        arguments: [this],
      };
    } else if (
      contextValue === "custom" ||
      collapsibleState === vscode.TreeItemCollapsibleState.None
    ) {
      this.command = {
        command: "quickProjectCreator.createProject",
        title: "Create Project",
        arguments: [this],
      };
    }
  }
}
