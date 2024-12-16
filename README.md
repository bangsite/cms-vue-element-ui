# Dashboard Vue

**Dashboard Vue** is a modern CMS template built with **Vue 3**, utilizing **TypeScript** and integrated with **Element Plus UI** components. It leverages **Vite** for a fast and efficient development workflow, featuring file-based routing, automatic component imports, and state management with **Pinia**.

## Environment

- **Node.js**: Version >= 16.x
- **NPM**: Version >= 10.x (Yarn can also be used)
- **Operating System**: Windows, macOS

## Features
- [x] **Multilingual Support**: Offers support for multiple languages to cater to a global audience.
- [x] **Dynamic Routing**: Generates comprehensive permissions for dynamic routing.
- [x] **Reusable Components**: Includes encapsulated components for easy reuse in various contexts.
- [x] **Board Management**: Provides a user-friendly interface for creating, managing, and dragging & dropping boards.
- [x] **Task Management**: Enables the creation, management, and tracking of tasks through an intuitive board interface.
- [ ] **Product Management**: Facilitates the efficient organization and management of products.
- [ ] **Post Management**: Allows for the efficient organization and management of posts.
- [ ] **Image Management**: Features capabilities for displaying, uploading, and filtering images.
- [x] **Dynamic Tables**: Offers the ability to create, manage, drag and drop, and extend tables through a user-friendly interface.
- [ ] **User Authentication**: Ensures secure login and authentication for user management.
- [ ] **Dynamic Layouts**: Provides flexible arrangements of sections tailored to user preferences.
- [ ] **Calendar Event**: Allows for effortless management of events and deadlines with a calendar view.
- [ ] **Test Driven Development**: Test both expected functionalities and that unexpected input throws the proper errors.

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
