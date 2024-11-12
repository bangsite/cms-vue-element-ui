# Dashboard Vue

**Dashboard Vue** is a modern CMS template built with **Vue 3**, utilizing **TypeScript** and integrated with **Element Plus UI** components. It leverages **Vite** for a fast and efficient development workflow, featuring file-based routing, automatic component imports, and state management with **Pinia**.

## Table of Contents

- [Environment](#environment)
- [Features](#features)
- [Preparation](#preparation)
- [Setup](#setup)
- [Testing](#testing)
- [Change Log](#change-log)
- [License](#license)

## Environment

- **Node.js**: Version >= 16.x
- **NPM**: Version >= 10.x (Yarn can also be used)
- **Operating System**: Windows, macOS

## Features
- **Multilingual Support**: Supports multiple languages for a global audience.
- **Dynamic Routing**: Generates comprehensive dynamic routing permissions.
- **Reusable Components**: Encapsulated commonly used components for easy reuse.
- **User Authentication**: Secure login and authentication checks for user management.
- **Task Management**: Create, manage, and track tasks through a user-friendly board interface.
- **Drag-and-Drop Interface**: Customizable layouts with easy item reordering.
- **Dynamic Layouts**: Flexible arrangement of sections tailored to user preferences.
- **Project Management**: Efficient organization and management of projects.
- **Rich Content Handling**: Create posts with dynamic content capabilities, including images.
- **Image Upload and Gallery**: Upload images and display them in various layouts.
- **Calendar Integration**: Manage events and deadlines effortlessly with a calendar view.
- **Blogging Capability**: Easily write and publish blog posts.

## Preparation

Before you begin, ensure you have the following:

- [Node.js](http://nodejs.org/) and [Git](https://git-scm.com/) for project development.
- Familiarity with [Vite](https://vitejs.dev/) features.
- Basic understanding of [Vue 3](https://v3.vuejs.org/) syntax.
- Knowledge of [TypeScript](https://www.typescriptlang.org/) basics.
- Understanding of [Vue Router](https://router.vuejs.org/) for routing.
- Familiarity with [Pinia](https://pinia.vuejs.org/) for state management.
- Basic knowledge of using [Element Plus](https://element-plus.org/).

## Setup

To get started with the project, follow these steps:

Install Dependencies:

```sh
npm install
```

Start the Development Server

```sh
npm run dev
```

Build for Production

```sh
npm run build
```

### Testing

Run Unit Tests:

```sh
npm run test:unit
```

Run End-to-End Tests For Development:

```sh
npm run test:e2e:dev
```

Run End-to-End Tests For Production:

```sh
npm run build
npm run test:e2e
```

Lint the Code:

```sh
npm run lint
```

## Change Log

[CHANGELOG](./CHANGELOG.md)

## License

[MIT](./LICENSE)
