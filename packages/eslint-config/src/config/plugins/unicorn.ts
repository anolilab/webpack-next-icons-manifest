import { createConfig } from "../../utils/create-config";
import interopDefault from "../../utils/interop-default";
import type { OptionsFiles, OptionsHasPrettier, OptionsOverrides, OptionsPackageJson, OptionsStylistic } from "../../types";

export default createConfig<OptionsOverrides & OptionsStylistic & OptionsFiles & OptionsHasPrettier & OptionsPackageJson>("all", async (config, oFiles) => {
    const { files = oFiles, prettier, stylistic = true, overrides, packageJson } = config;

    const { indent = 4 } = typeof stylistic === "boolean" ? {} : stylistic;

    const pluginUnicorn = await interopDefault(import("eslint-plugin-unicorn"));

    return [
        {
            name: "anolilab/unicorn/plugin",
            plugins: {
                unicorn: pluginUnicorn,
            },
        },
        {
            name: "anolilab/unicorn/rules",
            files,
            rules: {
                // TODO: Temporarily disabled as the rule is buggy.
                "function-call-argument-newline": "off",
                // Disabled because of eslint-plugin-regexp
                "unicorn/better-regex": "off",
                // TODO: Disabled for now until it becomes more stable: https://github.com/sindresorhus/eslint-plugin-unicorn/search?q=consistent-destructuring+is:issue&state=open&type=issues
                "unicorn/consistent-destructuring": "off",
                // TODO: Remove this override when the rule is more stable.
                "unicorn/consistent-function-scoping": "off",

                "unicorn/filename-case": [
                    "error",
                    {
                        case: "kebabCase",
                        ignore: [/(FUNDING\.yml|README\.md|CHANGELOG\.md|CONTRIBUTING\.md|CODE_OF_CONDUCT\.md|SECURITY\.md|LICENSE)/u],
                    },
                ],

                "unicorn/no-array-for-each": "off",

                // TODO: Disabled for now as I don't have time to deal with the backslash that might come from this. Try to enable this rule in 2024.
                "unicorn/no-null": "off",

                // TODO: Temporarily disabled until it becomes more mature.
                "unicorn/no-useless-undefined": "off",

                // It will be disabled in the next version of eslint-plugin-unicorn.
                "unicorn/prefer-json-parse-buffer": "off",

                "unicorn/prefer-module": packageJson.type === "module" ? "error" : "off",

                "unicorn/prefer-node-protocol": "error",

                // We only enforce it for single-line statements to not be too opinionated.
                "unicorn/prefer-ternary": ["error", "only-single-line"],

                ...(prettier
                    ? {
                          "unicorn/empty-brace-spaces": "off",
                          "unicorn/no-nested-ternary": "off",
                          "unicorn/number-literal-case": "off",
                          "unicorn/template-indent": "off",
                      }
                    : {
                          "unicorn/template-indent": ["error", { indent }],
                      }),

                ...overrides,
            },
        },
        {
            name: "anolilab/unicorn/tsconfig-overrides",
            files: ["tsconfig.dev.json", "tsconfig.prod.json"],
            rules: {
                "unicorn/prevent-abbreviations": "off",
            },
        },
        {
            name: "anolilab/unicorn/ts-overrides",
            files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
            rules: {
                "unicorn/import-style": "off",
            },
        },
    ];
});
