import confusingBrowserGlobals from "confusing-browser-globals";

import { createConfig, getFilesGlobs } from "../utils/create-config";
import type { OptionsFiles } from "../types";

export default createConfig<OptionsFiles>("all", async (config, oFiles) => {
    const { files = oFiles } = config;

    return [
        {
            name: "anolilab/variables/rules",
            files,
            rules: {
                // enforce or disallow variable initializations at definition
                "init-declarations": "off",

                // disallow the catch clause parameter name being the same as a variable in the outer scope
                "no-catch-shadow": "off",

                // disallow deletion of variables
                "no-delete-var": "error",

                // disallow labels that share a name with a variable
                // https://eslint.org/docs/rules/no-label-var
                "no-label-var": "error",

                // disallow specific globals
                "no-restricted-globals": [
                    "error",
                    {
                        message: "Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
                        name: "isFinite",
                    },
                    {
                        message: "Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
                        name: "isNaN",
                    },
                    ...confusingBrowserGlobals.map((g) => {
                        return {
                            name: g,
                            message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
                        };
                    }),
                ],

                // disallow declaration of variables already declared in the outer scope
                "no-shadow": "error",

                // disallow shadowing of names such as arguments
                "no-shadow-restricted-names": "error",

                // disallow use of undeclared variables unless mentioned in a /*global */ block
                "no-undef": "error",

                // disallow use of undefined when initializing variables
                "no-undef-init": "error",

                // allow use of undefined variable
                // https://eslint.org/docs/rules/no-undefined
                "no-undefined": "off",

                // disallow declaration of variables that are not used in the code
                "no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true, vars: "all" }],

                // disallow use of variables before they are defined
                "no-use-before-define": ["error", { classes: true, functions: true, variables: true }],
            },
        },
        {
            name: "anolilab/variables/ts-rules",
            files: getFilesGlobs("ts"),
            rules: {
                // Disallow member access on a value with type any.
                // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
                "no-use-before-define": "off",

                // Disallow unsafe declaration merging.
                // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
                "no-unused-vars": "off",

                // Disallow invocation of require().
                // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
                "no-shadow": "off",

                // Disallow unnecessary constraints on generic types.
                "no-undef": "off",
            },
        },
    ];
});
