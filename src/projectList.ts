import { ProjectCategory } from "./types";

export const projectList: ProjectCategory[] = [
  {
    id: "frontend",
    label: "Frontend Frameworks and Libraries",
    children: [
      {
        id: "react-js",
        label: "React (JavaScript)",
        command: "npx create-react-app .",
        icon: "react",
      },
      {
        id: "react-ts",
        label: "React (TypeScript)",
        command: "npx create-react-app . --template typescript",
        icon: "react",
      },
      {
        id: "vue-js",
        label: "Vue.js (JavaScript)",
        command: "npm init vue@latest .",
        icon: "symbol-misc",
      },
      {
        id: "vue-ts",
        label: "Vue.js (TypeScript)",
        command: "npm init vue@latest . -- --typescript",
        icon: "symbol-misc",
      },
      {
        id: "angular",
        label: "Angular",
        command:
          "npx @angular/cli new temp-project --directory ./ && mv temp-project/* . && mv temp-project/.* . && rmdir temp-project",
        icon: "circuit-board",
      },
      {
        id: "svelte",
        label: "Svelte",
        command: "npx degit sveltejs/template .",
        icon: "symbol-event",
      },
      {
        id: "preact",
        label: "Preact",
        command: "npx preact-cli create default .",
        icon: "symbol-color",
      },
      {
        id: "solidjs",
        label: "Solid.js",
        command: "npx degit solidjs/templates/js .",
        icon: "symbol-namespace",
      },
      {
        id: "alpinejs",
        label: "Alpine.js",
        command: "npm init -y && npm install alpinejs",
        icon: "symbol-method",
      },
      {
        id: "lit",
        label: "Lit",
        command: "npm init @lit/app@latest .",
        icon: "symbol-enum",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Frameworks",
    children: [
      {
        id: "express",
        label: "Express.js (Node.js)",
        command: "npx express-generator .",
        icon: "server",
      },
      {
        id: "nestjs",
        label: "Nest.js (Node.js)",
        command: "npx @nestjs/cli new . --directory ./",
        icon: "server-process",
      },
      {
        id: "koa",
        label: "Koa.js (Node.js)",
        command: "npm init -y && npm install koa && npm install koa-router",
        icon: "server-environment",
      },
      {
        id: "fastify",
        label: "Fastify (Node.js)",
        command: "npm init fastify .",
        icon: "rocket",
      },
      {
        id: "django",
        label: "Django (Python)",
        command:
          "django-admin startproject config . && python manage.py startapp main",
        icon: "symbol-namespace",
      },
      {
        id: "flask",
        label: "Flask (Python)",
        command:
          "pip install flask && echo \"from flask import Flask\\n\\napp = Flask(__name__)\\n\\n@app.route('/')\\ndef hello():\\n    return 'Hello, World!'\\n\\nif __name__ == '__main__':\\n    app.run(debug=True)\" > app.py",
        icon: "beaker",
      },
      {
        id: "fastapi",
        label: "FastAPI (Python)",
        command:
          "pip install fastapi[all] && echo \"from fastapi import FastAPI\\n\\napp = FastAPI()\\n\\n@app.get('/')\\ndef read_root():\\n    return {'Hello': 'World'}\\n\\nif __name__ == '__main__':\\n    import uvicorn\\n    uvicorn.run(app, host='0.0.0.0', port=8000)\" > main.py",
        icon: "zap",
      },
      {
        id: "spring-boot",
        label: "Spring Boot (Java)",
        command:
          "mvn archetype:generate -DgroupId=com.example -DartifactId=. -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false && mvn io.spring.javaformat:spring-javaformat-maven-plugin:apply",
        icon: "symbol-class",
      },
      {
        id: "dotnet",
        label: ".NET (C#)",
        command: "dotnet new webapi -o .",
        icon: "symbol-structure",
      },
      {
        id: "ruby-on-rails",
        label: "Ruby on Rails",
        command: "rails new . --database=postgresql",
        icon: "ruby",
      },
    ],
  },
  {
    id: "fullstack",
    label: "Full-Stack Frameworks",
    children: [
      {
        id: "nextjs",
        label: "Next.js",
        command: "npx create-next-app@latest .",
        icon: "server-process",
      },
      {
        id: "nuxtjs",
        label: "Nuxt.js",
        command: "npx create-nuxt-app .",
        icon: "server-process",
      },
      {
        id: "sveltekit",
        label: "SvelteKit",
        command: "npm create svelte@latest .",
        icon: "server-process",
      },
      {
        id: "remix",
        label: "Remix",
        command: "npx create-remix@latest .",
        icon: "server-process",
      },
      {
        id: "redwood",
        label: "RedwoodJS",
        command: "yarn create redwood-app .",
        icon: "symbol-misc",
      },
      {
        id: "blitz",
        label: "Blitz.js",
        command: "npx blitz new .",
        icon: "rocket",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile App Development",
    children: [
      {
        id: "react-native",
        label: "React Native",
        command: "npx react-native init .",
        icon: "device-mobile",
      },
      {
        id: "flutter",
        label: "Flutter",
        command: "flutter create .",
        icon: "device-mobile",
      },
      {
        id: "ionic-angular",
        label: "Ionic (Angular)",
        command: "ionic start . blank --type=angular --capacitor",
        icon: "device-mobile",
      },
      {
        id: "ionic-react",
        label: "Ionic (React)",
        command: "ionic start . blank --type=react --capacitor",
        icon: "device-mobile",
      },
      {
        id: "xamarin",
        label: "Xamarin",
        command: "dotnet new xamarin-forms -o .",
        icon: "device-mobile",
      },
    ],
  },
  {
    id: "static-site-generators",
    label: "Static Site Generators",
    children: [
      {
        id: "gatsby",
        label: "Gatsby",
        command: "npx gatsby new .",
        icon: "symbol-misc",
      },
      {
        id: "hugo",
        label: "Hugo",
        command: "hugo new site . --force",
        icon: "symbol-misc",
      },
      {
        id: "jekyll",
        label: "Jekyll",
        command: "jekyll new . --force",
        icon: "symbol-misc",
      },
      {
        id: "eleventy",
        label: "Eleventy (11ty)",
        command:
          "npm init -y && npm install @11ty/eleventy && echo \"module.exports = function(eleventyConfig) { return { dir: { input: 'src', output: 'dist' } }; };\" > .eleventy.js && mkdir src",
        icon: "symbol-misc",
      },
    ],
  },
  {
    id: "desktop",
    label: "Desktop App Development",
    children: [
      {
        id: "electron",
        label: "Electron",
        command: "npx create-electron-app .",
        icon: "desktop-download",
      },
      {
        id: "tauri",
        label: "Tauri",
        command: "npm init tauri-app .",
        icon: "desktop-download",
      },
    ],
  },
  {
    id: "api-development",
    label: "API Development",
    children: [
      {
        id: "graphql-apollo",
        label: "GraphQL (Apollo Server)",
        command:
          "npm init -y && npm install apollo-server graphql && echo \"const { ApolloServer, gql } = require('apollo-server');\\n\\nconst typeDefs = gql`\\n  type Query {\\n    hello: String\\n  }\\n`;\\n\\nconst resolvers = {\\n  Query: {\\n    hello: () => 'Hello world!',\\n  },\\n};\\n\\nconst server = new ApolloServer({ typeDefs, resolvers });\\n\\nserver.listen().then(({ url }) => {\\n  console.log(`🚀  Server ready at ${url}`);\\n});\" > server.js",
        icon: "symbol-interface",
      },
      {
        id: "grpc",
        label: "gRPC (Node.js)",
        command:
          "npm init -y && npm install @grpc/grpc-js @grpc/proto-loader && mkdir proto && echo \"syntax = 'proto3';\\n\\npackage example;\\n\\nservice ExampleService {\\n  rpc SayHello (HelloRequest) returns (HelloReply) {}\\n}\\n\\nmessage HelloRequest {\\n  string name = 1;\\n}\\n\\nmessage HelloReply {\\n  string message = 1;\\n}\" > proto/example.proto",
        icon: "symbol-method",
      },
    ],
  },
];
