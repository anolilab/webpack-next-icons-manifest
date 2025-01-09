import { hasPackageJsonAnyDependency } from "@visulima/package";
import type { Linter } from "eslint";

import type {
    OptionsHasPrettier,
    OptionsOverrides,
    OptionsPackageJson,
    OptionsSilentConsoleLogs,
    OptionsStylistic,
    TypedFlatConfigItem,
} from "../../types";
import interopDefault from "../../utils/interop-default";

const jsonc = async (
    config: OptionsHasPrettier & OptionsOverrides & OptionsPackageJson & OptionsSilentConsoleLogs & OptionsStylistic,
): Promise<TypedFlatConfigItem[]> => {
    const {
        overrides,
        packageJson,
        prettier,
        silent,
        stylistic = true,
    } = config;
    const { indent = 4 } = typeof stylistic === "boolean" ? {} : stylistic;

    const jsoncPlugin = await interopDefault(import("eslint-plugin-jsonc"));

    const hasSortPackageJson = hasPackageJsonAnyDependency(packageJson, ["sort-package-json"]);

    if (hasSortPackageJson && !silent) {
        // eslint-disable-next-line no-console
        console.info(`\n@anolilab/eslint-config found "sort-package-json" package. \n
    Following rules are disabled: jsonc/sort-keys for all package.json files. \n`);
    }

    return [
        ...jsoncPlugin.configs["flat/base"],
        {
            files: ["**/*.json5"],
            name: "anolilab/jsonc/json5-rules",
            rules: (jsoncPlugin.configs["recommended-with-json5"] as Linter.Config).rules,
        },
        {
            files: ["**/*.jsonc"],
            name: "anolilab/jsonc/jsonc-rules",
            rules: (jsoncPlugin.configs["recommended-with-jsonc"] as Linter.Config).rules,
        },
        {
            files: ["**/*.json"],
            name: "anolilab/jsonc/json-rules",
            rules: (jsoncPlugin.configs["recommended-with-json"] as Linter.Config).rules,
        },
        {
            files: ["**/package.json"],
            name: "anolilab/jsonc/package.json-rules",
            rules: {
                "jsonc/sort-array-values": hasSortPackageJson
                    ? "off"
                    : [
                        "error",
                        {
                            order: { type: "asc" },
                            pathPattern: "^files$",
                        },
                    ],

                // eslint-disable-next-line max-len
                // When the package "sort-package-json" is installed, we disable the rule "jsonc/sort-keys" because, the package "sort-package-json" is responsible for sorting the keys.
                "jsonc/sort-keys": hasSortPackageJson
                    ? "off"
                    : [
                        "error",
                        {
                            order: [
                                "$schema",
                                "name",
                                "displayName",
                                "version",
                                "private",
                                "description",
                                "categories",
                                "keywords",
                                "homepage",
                                "bugs",
                                "repository",
                                "funding",
                                "license",
                                "qna",
                                "author",
                                "maintainers",
                                "contributors",
                                "publisher",
                                "sideEffects",
                                "type",
                                "imports",
                                "exports",
                                "main",
                                "svelte",
                                "umd:main",
                                "jsdelivr",
                                "unpkg",
                                "module",
                                "source",
                                "jsnext:main",
                                "browser",
                                "react-native",
                                "types",
                                "typesVersions",
                                "typings",
                                "style",
                                "example",
                                "examplestyle",
                                "assets",
                                "bin",
                                "man",
                                "directories",
                                "files",
                                "workspaces",
                                "binary",
                                "scripts",
                                "betterScripts",
                                "contributes",
                                "activationEvents",
                                "husky",
                                "simple-git-hooks",
                                "pre-commit",
                                "commitlint",
                                "lint-staged",
                                "nano-staged",
                                "config",
                                "nodemonConfig",
                                "browserify",
                                "babel",
                                "browserslist",
                                "xo",
                                "prettier",
                                "eslintConfig",
                                "eslintIgnore",
                                "npmpackagejsonlint",
                                "release",
                                "remarkConfig",
                                "stylelint",
                                "ava",
                                "jest",
                                "mocha",
                                "nyc",
                                "tap",
                                "oclif",
                                "resolutions",
                                "dependencies",
                                "devDependencies",
                                "dependenciesMeta",
                                "peerDependencies",
                                "peerDependenciesMeta",
                                "optionalDependencies",
                                "bundledDependencies",
                                "bundleDependencies",
                                "extensionPack",
                                "extensionDependencies",
                                "flat",
                                "packageManager",
                                "engines",
                                "engineStrict",
                                "volta",
                                "languageName",
                                "os",
                                "cpu",
                                "preferGlobal",
                                "publishConfig",
                                "icon",
                                "badges",
                                "galleryBanner",
                                "preview",
                                "markdown",
                                "pnpm",
                            ],
                            pathPattern: "^$",
                        },
                        {
                            order: { type: "asc" },
                            pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
                        },
                        {
                            order: { type: "asc" },
                            pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
                        },
                        {
                            order: ["types", "import", "require", "default"],
                            pathPattern: "^exports.*$",
                        },
                        {
                            order: [
                                "applypatch-msg",
                                "pre-applypatch",
                                "post-applypatch",
                                "pre-commit",
                                "pre-merge-commit",
                                "prepare-commit-msg",
                                "commit-msg",
                                "post-commit",
                                "pre-rebase",
                                "post-checkout",
                                "post-merge",
                                "pre-push",
                                "pre-receive",
                                "update",
                                "post-receive",
                                "post-update",
                                "push-to-checkout",
                                "pre-auto-gc",
                                "post-rewrite",
                                "sendemail-validate",
                                "fsmonitor-watchman",
                                "p4-pre-submit",
                                "post-index-chang",
                            ],
                            pathPattern: "^(?:gitHooks|husky|simple-git-hooks)$",
                        },
                        {
                            order: ["build", "preinstall", "install", "postinstall", "lint", { order: { type: "asc" } }],
                            pathPattern: "^scripts$",
                        },
                    ],
            },
        },
        {
            files: ["**/tsconfig.json", "**/tsconfig.*.json"],
            name: "anolilab/jsonc/tsconfig-json",
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        order: ["extends", "compilerOptions", "references", "files", "include", "exclude"],
                        pathPattern: "^$",
                    },
                    {
                        order: [
                            /* Projects */
                            "incremental",
                            "composite",
                            "tsBuildInfoFile",
                            "disableSourceOfProjectReferenceRedirect",
                            "disableSolutionSearching",
                            "disableReferencedProjectLoad",
                            /* Language and Environment */
                            "target",
                            "jsx",
                            "jsxFactory",
                            "jsxFragmentFactory",
                            "jsxImportSource",
                            "lib",
                            "moduleDetection",
                            "noLib",
                            "reactNamespace",
                            "useDefineForClassFields",
                            "emitDecoratorMetadata",
                            "experimentalDecorators",
                            /* Modules */
                            "baseUrl",
                            "rootDir",
                            "rootDirs",
                            "customConditions",
                            "module",
                            "moduleResolution",
                            "moduleSuffixes",
                            "noResolve",
                            "paths",
                            "resolveJsonModule",
                            "resolvePackageJsonExports",
                            "resolvePackageJsonImports",
                            "typeRoots",
                            "types",
                            "allowArbitraryExtensions",
                            "allowImportingTsExtensions",
                            "allowUmdGlobalAccess",
                            /* JavaScript Support */
                            "allowJs",
                            "checkJs",
                            "maxNodeModuleJsDepth",
                            /* Type Checking */
                            "strict",
                            "strictBindCallApply",
                            "strictFunctionTypes",
                            "strictNullChecks",
                            "strictPropertyInitialization",
                            "allowUnreachableCode",
                            "allowUnusedLabels",
                            "alwaysStrict",
                            "exactOptionalPropertyTypes",
                            "noFallthroughCasesInSwitch",
                            "noImplicitAny",
                            "noImplicitOverride",
                            "noImplicitReturns",
                            "noImplicitThis",
                            "noPropertyAccessFromIndexSignature",
                            "noUncheckedIndexedAccess",
                            "noUnusedLocals",
                            "noUnusedParameters",
                            "useUnknownInCatchVariables",
                            /* Emit */
                            "declaration",
                            "declarationDir",
                            "declarationMap",
                            "downlevelIteration",
                            "emitBOM",
                            "emitDeclarationOnly",
                            "importHelpers",
                            "importsNotUsedAsValues",
                            "inlineSourceMap",
                            "inlineSources",
                            "mapRoot",
                            "newLine",
                            "noEmit",
                            "noEmitHelpers",
                            "noEmitOnError",
                            "outDir",
                            "outFile",
                            "preserveConstEnums",
                            "preserveValueImports",
                            "removeComments",
                            "sourceMap",
                            "sourceRoot",
                            "stripInternal",
                            /* Interop Constraints */
                            "allowSyntheticDefaultImports",
                            "esModuleInterop",
                            "forceConsistentCasingInFileNames",
                            "isolatedDeclarations",
                            "isolatedModules",
                            "preserveSymlinks",
                            "verbatimModuleSyntax",
                            /* Completeness */
                            "skipDefaultLibCheck",
                            "skipLibCheck",
                        ],
                        pathPattern: "^compilerOptions$",
                    },
                ],
            },
        },
        ...prettier ? jsoncPlugin.configs["flat/prettier"] : [],
        {
            files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
            rules: {
                ...stylistic
                    ? {
                        "jsonc/array-bracket-spacing": ["error", "never"],
                        "jsonc/comma-dangle": ["error", "never"],
                        "jsonc/comma-style": ["error", "last"],
                        "jsonc/indent": ["error", indent],
                        "jsonc/key-spacing": ["error", { afterColon: true, beforeColon: false }],
                        "jsonc/object-curly-newline": ["error", { consistent: true, multiline: true }],
                        "jsonc/object-curly-spacing": ["error", "always"],
                        "jsonc/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
                        "jsonc/quote-props": "error",
                        "jsonc/quotes": "error",
                    }
                    : {},

                ...overrides,
            },
        },
    ];
};

export default jsonc;
