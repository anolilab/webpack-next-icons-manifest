# ESLint config

This package provides Anolilab’s .eslintrc.cjs as an extensible shared config, with a range of useful plugins that are often too time-consuming to setup and provides an   install  the plugins you need, based on your project’s dependencies.

---

<div align="center">
    <p>
        <sup>
            Daniel Bannert's open source work is supported by the community on <a href="https://github.com/sponsors/prisis">GitHub Sponsors</a>
        </sup>
    </p>
</div>

---

## Install

To install this config, run the following command.

```bash
  npm install eslint @anolilab/eslint-config --save-dev
```

## Usage

If you don’t have a `.eslintrc.cjs`, we will create the file for you after installing `@anolilab/eslint-config`.

If you already have a `.eslintrc.cjs`, then you can extend the `.eslintrc.cjs`, with `@anolilab/eslint-config`.

> Note: Our default export contains all of our ESLint rules, including ECMAScript 6+. `@anolilab/eslint-config` use the `ecmaVersion`:`2021` as default.
>
> To change this configuration, change `env: { es2021: false, then active you needed env }` same for, `parserOptions: { "ecmaVersion": 2021 change the version }`

```js
module.exports = {
    root: true,
    extends: ["@anolilab/eslint-config"],
    env: {
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    }
};
```

For more advanced use cases see the example configurations for Node, TypeScript, React or Prettier.

> Note: `@anolilab/eslint-config` will handle the configuration for almost all eslint-plugins / eslint-configs automatically.
> With this you only need to install the needed plugins/configs for TypeScript or React and you done.

### Node

```bash
npm install --save-dev eslint eslint-plugin-node @anolilab/eslint-config
```

### TypeScript

```bash
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin @anolilab/eslint-config
```

### React

```bash
  npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-hooks @anolilab/eslint-config
```

Or for the use of `TypeScript` in react

```bash
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks @anolilab/eslint-config
```

Please extend the `.eslintrc.cjs` file with the correct `tsconfig.js` path.

```js
export default {
    parserOptions: {
        project: "./tsconfig.eslint.json",
    },
}
```

### MDX

```bash
npm install --save-dev eslint eslint-plugin-mdx @anolilab/eslint-config
```

### Let [Prettier](https://prettier.io/) handle style-related rules

Prettier is a code formatting tool that offers fewer options but is more professional than the style-related rules in ESLint.

Now that Prettier has become a necessary tool in front end projects, eslint-config-alloy does not need to maintain the style-related rules in ESLint anymore, so we completely removed all Prettier related rules in the v3 version, and use ESLint to check logical errors which it’s good at.

As for whether two spaces or four spaces are used for indentation and whether there is a semicolon at the end, you can configure it in the project’s .prettierrc.cjs. Of course, we also provide a recommended Prettier configuration for your reference.

`@anolilab/eslint-config` does not include all style-related rules, so there is no need to install `eslint-config-prettier`. Install `prettier` and if you use `VSCode` the related plugins.

This the used [.prettierrc.cjs](../prettier-config/index.cjs) configuration by Anolilab Team only for reference.

## Using experimental features with JavaScript

If you are using experimental features such as class fields with JavaScript files you should install `@babel/eslint-parser`.

```bash
npm install --save-dev @babel/eslint-parser
```

## Plugins

### Code Quality

This plugin provide a range of code quality rules:
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

### Languages
The following plugins expand esLint to work with json files, and lint JavaScript contained in HTML, and MarkDown:

- [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
- [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
- [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)

When linting code snippets in Markdown files, a few [rules](rules/plugins/markdown.cjs#L3) relating to globals and unused vars are disabled.

### Library Plugins

These plugins will be loaded in based on your project `dependencies` in `package.json`. If a supported library is part of your project then it’s related esLint plugins will be loaded. The following packages are supported:

- [eslint-plugin-fsa](https://github.com/joseph-galindo/eslint-plugin-fsa)
- [eslint-plugin-lodash](https://github.com/wix/eslint-plugin-lodash)
- [eslint-plugin-lodash-fp](https://github.com/jfmengels/eslint-plugin-lodash-fp)
- [eslint-plugin-react-redux](https://github.com/DianaSuvorova/eslint-plugin-react-redux#readme)
- [eslint-plugin-redux-saga](https://github.com/pke/eslint-plugin-redux-saga)

### Practices

The following esLint plugins enforce good coding practices:

- [eslint-plugin-array-func](https://github.com/freaktechnik/eslint-plugin-array-func)
- [eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)
- [eslint-plugin-no-constructor-bind](https://github.com/markalfred/eslint-plugin-no-constructor-bind)
- [eslint-plugin-no-use-extend-native](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native)
- [eslint-plugin-optimize-regex](https://github.com/BrainMaestro/eslint-plugin-optimize-regex)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-switch-case](https://github.com/lukeapage/eslint-plugin-switch-case)

### Security

These plugins add code security rules to esLint:

- [eslint-plugin-no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [eslint-plugin-no-unsanitized](https://github.com/mozilla/eslint-plugin-no-unsanitized)
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)

### Test Libraries

Test plugins are loaded based on which testing tools you have listed in `devDependencies` of `package.json`. The following test plugins are supported:

- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [eslint-plugin-jest-async](https://www.npmjs.com/package/eslint-plugin-jest-async)
- [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)

### List of used plugins

    - eslint-import-resolver-node
    - eslint-plugin-compat
    - eslint-plugin-eslint-comments
    - eslint-plugin-import
    - eslint-plugin-markdown
    - eslint-plugin-no-loops
    - eslint-plugin-no-secrets
    - eslint-plugin-optimize-regex
    - eslint-plugin-promise
    - eslint-plugin-sonarjs
    - eslint-plugin-simple-import-sort
    - eslint-plugin-sort-keys-fix
    - eslint-plugin-unicorn
    - eslint-plugin-you-dont-need-lodash-underscore
    - eslint-plugin-you-dont-need-momentjs

## Troubleshooting

### With VSCode

ESLint will not lint `.vue`, `.ts` or `.tsx` files in VSCode by default, you need to set your `.vscode/settings.json` like this:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
  ]
}
```

#### Autofix ESLint errors on save

If you want to enable auto-fix-on-save, you need to set your `.vscode/settings.json` like this:

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

A best practice for VSCode is to auto format code with Prettier and autofix errors with ESLint by setting `.vscode/settings.json` to this:

```json
{
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Q & A

### Why not standard

The standard specification believes that everyone should not waste time in personalized specifications, but the entire community should unify a specification. This statement makes  sense, but it runs against the ESLint’s design philosophy.
Don’t you remember how ESLint defeated JSHint and became the most popular JS code inspection tool? It’s because of the plugin and configuration that ESLint advocates, which meets the individual needs of different technology stacks of different teams.

Therefore, `@anolilab/eslint-config` also inherits the philosophy of ESLint. It will not force you to use our config.

## Supported Node.js Versions

Libraries in this ecosystem make the best effort to track
[Node.js’ release schedule](https://nodejs.org/en/about/releases/). Here’s [a
post on why we think this is important](https://medium.com/the-node-js-collection/maintainers-should-consider-following-node-js-release-schedule-ab08ed4de71a).

Contributing
------------

If you would like to help take a look at the [list of issues](https://github.com/anolilab/javascript-style-guide/issues) and check our [Contributing](.github/CONTRIBUTING.md) guild.

> **Note:** please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

Credits
-------------

- [Daniel Bannert](https://github.com/prisis)
- [All Contributors](https://github.com/anolilab/javascript-style-guide/graphs/contributors)

License
-------------

The anolilab javascript-style-guide is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT)