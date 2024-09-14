# Quick Project Creator

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Assumptions](#assumptions)
- [Supported Projects](#supported-projects)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating a New Project](#creating-a-new-project)
  - [Creating a Custom Boilerplate](#creating-a-custom-boilerplate)
  - [Using a Custom Boilerplate](#using-a-custom-boilerplate)
  - [Managing Custom Boilerplates](#managing-custom-boilerplates)
- [Extension Settings](#extension-settings)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Quick Project Creator is a powerful VS Code extension designed to streamline your project initialization process. It allows you to quickly create new projects from predefined templates or custom boilerplates, saving you time and ensuring consistency across your projects.

## Features

- **Predefined Project Templates**: Choose from a variety of built-in project templates for popular frameworks and libraries.
- **Custom Boilerplates**: Create and save your own project boilerplates for future use.
- **User-Friendly Interface**: Intuitive sidebar view for easy project and boilerplate management.
- **Flexible Project Creation**: Create projects in-place or in a new subfolder.
- **Template Customization**: Modify existing templates or create new ones to suit your needs.
- **Multi-Project Boilerplates**: Create complex project structures with multiple sub-projects in a single boilerplate.

## Assumptions

Quick Project Creator makes the following assumptions:

1. **Development Environment**: The extension assumes you are working in a local development environment with direct access to the file system.

2. **Command Line Tools**: It assumes that necessary command-line tools (like npm, yarn, create-react-app, etc.) are installed and accessible from the terminal.

3. **VS Code Version**: The extension is designed for and tested with VS Code version 1.60.0 and above.

4. **Operating System**: While efforts have been made to ensure cross-platform compatibility, the extension is primarily tested on Windows, macOS, and Ubuntu Linux.

5. **Project Structure**: For custom boilerplates, it assumes that you want to create a new directory for each project within the boilerplate.

6. **Internet Connection**: Some templates may require an internet connection to download dependencies or initialize projects from remote repositories.

7. **User Permissions**: It assumes that the user has necessary permissions to create directories and files in the chosen project location.

## Supported Projects

Quick Project Creator supports a wide range of project types out of the box. Here's a list of currently supported project templates:

1. **Web Development**:

   - React (using Create React App)
   - Next.js
   - Vue.js
   - Angular
   - Svelte
   - HTML5 Boilerplate

2. **Backend Development**:

   - Node.js (Express)
   - Python (Flask)
   - Python (Django)
   - Ruby on Rails
   - ASP.NET Core

3. **Full-Stack Frameworks**:

   - MERN Stack (MongoDB, Express, React, Node.js)
   - MEAN Stack (MongoDB, Express, Angular, Node.js)

4. **Mobile Development**:

   - React Native
   - Flutter

5. **Static Site Generators**:

   - Gatsby
   - Hugo
   - Jekyll

6. **Desktop Applications**:

   - Electron

7. **Game Development**:

   - Phaser

8. **Data Science**:

   - Jupyter Notebook
   - Python Data Science Boilerplate

9. **Miscellaneous**:
   - TypeScript Node.js Project
   - Webpack Boilerplate
   - Parcel Boilerplate

Custom boilerplates can be created using any combination of these project types or by defining entirely new project structures.

Note: The list of supported projects may expand over time. Check the extension's documentation or release notes for the most up-to-date list of supported project types.

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the Quick Open dialog
3. Type `ext install quick-project-creator` and press Enter
4. Click the Install button

Alternatively, you can install the extension directly from the Visual Studio Code Marketplace.

## Usage

### Creating a New Project

1. Open the Quick Project Creator sidebar by clicking on its icon in the Activity Bar or by pressing `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and searching for "Quick Project Creator: Open Sidebar".
2. Click on the "New Project" button.
3. Select a project template from the list of available options.
4. Enter a name for your project when prompted.
5. Choose a location to save your project.
6. Wait for the project creation process to complete.

### Creating a Custom Boilerplate

1. Open the Quick Project Creator sidebar.
2. Click on the "New Boilerplate" button.
3. Enter a name for your custom boilerplate.
4. Add projects to your boilerplate:
   - Enter a name for each sub-project.
   - Select the project type for each sub-project.
   - Choose the creation behavior (in-place or create subfolder) for each sub-project.
5. Repeat step 4 until you've added all desired projects to your boilerplate.
6. Click "Finish" to save your custom boilerplate.

### Using a Custom Boilerplate

1. Open the Quick Project Creator sidebar.
2. In the "Custom Boilerplates" section, click on the boilerplate you want to use.
3. Enter a name for your new project when prompted.
4. Choose a location to save your project.
5. Wait for the project creation process to complete.

### Managing Custom Boilerplates

- To delete a single custom boilerplate, click the trash icon next to its name in the sidebar.
- To delete all custom boilerplates, click the "Delete All Templates" button at the bottom of the Custom Boilerplates section.

## Extension Settings

This extension contributes the following settings:

- `quickProjectCreator.defaultProjectLocation`: Set the default location for new projects.
- `quickProjectCreator.showWelcomeMessage`: Enable/disable the welcome message when the extension is first installed.

## Known Issues

- The extension currently does not support remote development environments.
- Some project templates may require additional setup steps after creation.

Please report any issues you encounter on our [GitHub Issues page](https://github.com/yourusername/quick-project-creator/issues).

## Roadmap

- [ ] Add support for remote development environments
- [ ] Implement project template versioning
- [ ] Allow users to share custom boilerplates
- [ ] Integrate with popular package managers for automatic dependency installation
- [ ] Add support for post-creation scripts

## Contributing

We welcome contributions to the Quick Project Creator extension! Please see our [Contributing Guide](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This extension uses the [Lucide](https://lucide.dev/) icon set.
- Special thanks to all the open-source projects that inspired and made this extension possible.

---

For more information, please visit my [GitHub repository](https://github.com/farseenmanekhan1232/quick-project-creator) or contact me at farseenmanekhan1232@gmail.com .
