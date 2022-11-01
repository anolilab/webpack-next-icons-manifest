#!/usr/bin/env node

// eslint-disable-next-line no-undef
if (process.env.CI) {
    // eslint-disable-next-line no-undef
    process.exit(0);
}

const { writeFile, existsSync } = require("node:fs");
// eslint-disable-next-line unicorn/import-style
const { resolve, join } = require("node:path");
const { promisify } = require("node:util");

const writeFileAsync = promisify(writeFile);

// get the path to the host project.
// eslint-disable-next-line no-undef
const projectPath = resolve(process.cwd(), "..", "..", "..");

console.log("Configuring @anolilab/eslint-config", projectPath, "\n");

/**
 * Writes .eslintrc.cjs if it doesn't exist. Warns if it exists.
 */
const writeEslintRc = () => {
    const eslintPath = join(projectPath, ".eslintrc.cjs");
    const content = `
/** @ts-check */
/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: ["@anolilab/eslint-config"],
    ignorePatterns: ["!**/*"],
    env: {
        // Your environments (which contains several predefined global variables)
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
            // Set parserOptions.project for the project to allow TypeScript to create the type-checker behind the scenes when we run linting
            "parserOptions": {
            },
            rules: {},
        },
        {
            files: ["*.ts", "*.tsx"],
            // Set parserOptions.project for the project to allow TypeScript to create the type-checker behind the scenes when we run linting
            "parserOptions": {
            },
            rules: {},
        },
        {
            files: ["*.js", "*.jsx"],
            rules: {},
        },
    ],
};
`;

    if (existsSync(eslintPath)) {
        console.warn(`⚠️  .eslintrc.cjs already exists;
Make sure that it includes the following for @anolilab/eslint-config'
to work as it should: { extends: ["@anolilab/eslint-config"] }.`);

        return Promise.resolve();
    }

    return writeFileAsync(eslintPath, content, "utf-8");
};

/**
 * Writes .eslintignore if it doesn't exist. Warns if it exists.
 */
const writeEslintIgnore = () => {
    const eslintIgnorePath = join(projectPath, ".eslintignore");

    if (existsSync(eslintIgnorePath)) {
        console.warn("⚠️  .eslintignore already exists");

        return Promise.resolve();
    }

    return writeFileAsync(eslintIgnorePath, "", "utf-8");
};

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    try {
        // eslint-disable-next-line compat/compat
        await Promise.all([writeEslintRc(), writeEslintIgnore()]);

        console.log("😎  Everything went well, have fun!");

        // eslint-disable-next-line no-undef
        process.exit(0);
    } catch (error) {
        console.log("😬  something went wrong:");
        console.error(error.message);

        // eslint-disable-next-line no-undef
        process.exit(1);
    }
})();