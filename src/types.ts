export interface ProjectTemplate {
  id: string;
  label: string;
  command: string;
  icon: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  children: ProjectTemplate[];
}

export interface CustomTemplate {
  name: string;
  projects: ProjectTemplate[];
}
