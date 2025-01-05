# Dashboard Vue

**Dashboard Vue** is a modern CMS template built with **Vue 3**, utilizing **TypeScript** and integrated with **Element Plus UI** components. It leverages **Vite** for a fast and efficient development workflow, featuring file-based routing, automatic component imports, and state management with **Pinia**.

## Environment

- **Node.js**: Version >= 16.x
- **NPM**: Version >= 10.x (Yarn can also be used)
- **Operating System**: Windows, macOS

## Features
- [x] Building Vue 3 using Vite and typescript.
- [x] Routing with Vue router, config route guards, permissions.
- [x] State management with Pinia.
- [x] Automatic format code with ESLint and formatting with Prettier.
- [x] Building component UI with TailwindCSS and Element Plus UI.
- [x] Forms and Validation with VeeValidate
- [x] Support for multiple languages with 
- [x] Optimize application architecture and best practices.
- [x] Error handling and monitoring.
- [x] Pagination and Infinite scroll support.
- [x] Auto saving on edits to inline content.
- [x] Data and File Storage, plus Authentication with Nodejs and MongoDB REST APIs.
- [ ] Data filtering and searching strategies across multiple resources (projects, tasks, etc).
- [ ] Test both expected functionalities and that unexpected input throws the proper errors
- [ ] Dynamic Layouts section & block build landing page.
- [ ] Building calendar and event
- [ ] Building image management with Cloudinary
- [ ] SEO, Sitemaps, schema.org and Metadata.
- [ ] Transactional emails for dynamic app notifications.
- [ ] Real-time commenting
- [ ] Analytics and events tracking with Google Analytics 4, Google Tag Manager, and Sentry...

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
