# CMS Vue 3

CMS Vue 3 is template featuring a collection of components styled with Typescript, Antdesign, Pinna,... , built with Vite.
It includes file-based routing, auto-importing for components, state management via Pinna, a layout system, PWA support and more."

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Ecosystem

| Package                   | Version                                                                                                                                                                                                                                                                                                                                                     |
|---------------------------| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vite                      | [![NPM version](https://img.shields.io/npm/v/vite.svg)](https://npmjs.com/package/vite)                                                                                                                                                                                                                                                                     |
| create-vite               | [![NPM version](https://img.shields.io/npm/v/@vitejs/plugin-vue.svg)](https://www.npmjs.com/package/create-vite)                                                                                                                                                                                                                                            |
| vuejs/core                | [![NPM version](https://img.shields.io/npm/v/vue.svg)](https://www.npmjs.com/package/vue)                                                                                                                                                                                                                                                                   |
| vue-router                | [![NPM version](https://img.shields.io/npm/v/vue-router.svg)](https://www.npmjs.com/package/vue-router)                                                                                                                                                                                                                                                     |
| pinna                     | [![NPM version](https://badgen.net/npm/v/pinia)](https://npmjs.com/package/pinia)                                                                                                                                                                                                                                                                           |
| element-plus              | [![NPM version](https://img.shields.io/npm/v/element-plus.svg)](https://www.npmjs.org/package/element-plus)                                                                                                                                                                                                                                                                           |
| eslint                    | [![NPM version](https://img.shields.io/npm/v/eslint.svg)](https://www.npmjs.com/package/eslint)                                                                                                                                                                                                                                                             |
| eslint-plugin-vue         | [![NPM version](https://img.shields.io/npm/v/eslint-plugin-vue.svg?style=flat)](https://npmjs.org/package/eslint-plugin-vue)                                                                                                                                                                                                                                |
| prettier                  | [![NPM version](https://img.shields.io/npm/v/prettier.svg?style=flat-square)](https://www.npmjs.com/package/prettier)                                                                                                                                                                                                                                       |
| commitlint                | [![NPM version](https://img.shields.io/npm/v/@commitlint/cli.svg?style=flat-square)](https://www.npmjs.com/package/@commitlint/cli)                                                                                                                                                                                                                         |
| commitizen                | [![NPM version](https://img.shields.io/npm/v/commitizen.svg)](https://www.npmjs.com/package/commitizen)                                                                                                                                                                                                                                                     |
| commitlint-config-gitmoji | [![NPM version](https://camo.githubusercontent.com/f6b4d5145a2c07be8f4b0ea42d13d321ca361378fc5c2014b5b027637a352780/687474703a2f2f696d672e736869656c64732e696f2f6e706d2f762f636f6d6d69746c696e742d636f6e6669672d6769746d6f6a692e7376673f636f6c6f723d64656570677265656e266c6162656c3d6c6174657374)](https://www.npmjs.com/package/commitlint-config-gitmoji) |
| cz-customizable           | [![NPM version](https://img.shields.io/npm/v/prettier.svg?style=flat-square)](https://www.npmjs.com/package/cz-customizable)                                                                                                                                                                                                                                |

### Commit Message Format
