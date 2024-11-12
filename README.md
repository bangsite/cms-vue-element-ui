# Dashboard Vue

Dashboard Vue is a Vue 3-based CMS template built with TypeScript and integrated with Element Plus UI components. It
leverages Vite for fast development, file-based routing, automatic component imports, and state management with Pinia.

## Environment

- Node.js: >= 18.x
- NPM: >= 10.x (or use Yarn if preferred)
- Operating System: Windows, macOS

## Features

- **Multiple languages**：Built-in support for multiple languages.
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice
- **Examples** Built-in rich examples

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Vue Router](https://router.vuejs.org/) - The official Router for Vue.js
- [Pinia](https://pinia.vuejs.org/) - The intuitive store for Vue.js
- [Element-Plus](https://element-plus.org/) - Familiar with the basic use of element-plus

## Setup

Install Dependencies:

```sh
npm install
```

Start Development Server:

```sh
npm run dev
```

Build for Production:

```sh
npm run build
```

Run Unit Tests:

```sh
npm run test:unit
```

Run End-to-End Tests for development:

```sh
npm run test:e2e:dev
```

Run End-to-End Tests for production:

```sh
npm run build
npm run test:e2e
```

Lint the Code:

```sh
npm run lint
```

## How to contribute
<a href="https://github.com/bangsite/cms-vue-element-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bangsite/cms-vue-element-ui"  alt="contribute"/>
</a>

You can [Raise an issue](https://github.com/bangsite/cms-vue-element-ui/issues/new) Or submit a Pull Request.

**Pull Request:**

1. Fork code
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. Submit `pull request`

## Git Contribution submission specification

- `feat` New features
- `fix` Fix bugs
- `docs` document
- `style` Format and style (changes that do not affect code operation)
- `refactor` Refactor
- `perf` Optimize related, such as improving performance and experience
- `test` Add test
- `build` Compilation related modifications, changes to project construction or dependencies
- `ci` Continuous integration modification
- `chore` Changes in the construction process or auxiliary tools
- `revert` Rollback to previous version
- `workflow` Workflow improvement
- `mod` Uncertain modification classification
- `wip` Under development
- `types` type

## Change Log

[CHANGELOG](./CHANGELOG.md)

## License
[MIT](./LICENSE)
