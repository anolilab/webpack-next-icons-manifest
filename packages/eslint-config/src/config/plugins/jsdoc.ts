import { createConfig, getFilesGlobs } from "../../utils/create-config";
import type { OptionsFiles, OptionsPackageJson, OptionsStylistic } from "../../types";
import interopDefault from "../../utils/interop-default";
import { hasPackageJsonAnyDependency } from "@visulima/package";

export default createConfig<OptionsFiles & OptionsPackageJson & OptionsStylistic>("js", async (config, oFiles) => {
    const { files = oFiles, packageJson, stylistic = true } = config;

    const jsdocPlugin = await interopDefault(import("eslint-plugin-jsdoc"));

    const hasTypescript = hasPackageJsonAnyDependency(packageJson, ["typescript"]);
    const hasTsDocPlugin = hasPackageJsonAnyDependency(packageJson, ["eslint-plugin-tsdoc"]);

    if (hasTsDocPlugin) {
        console.info("\nFound eslint-plugin-tsdoc as dependency, disabling the jsdoc rules for *.ts and *.tsx files.");
    }

    const rules = [
        {
            name: "anolilab/jsdoc/setup",
            files: getFilesGlobs("all"),
            plugins: {
                jsdoc: jsdocPlugin,
            },
        },
        {
            name: "anolilab/jsdoc/js-rules",
            files,
            rules: {
                ...jsdocPlugin.configs["flat/recommended-error"].rules,

                ...(stylistic
                    ? {
                          "jsdoc/check-alignment": "warn",
                          "jsdoc/multiline-blocks": "warn",
                      }
                    : {}),
            },
        },
    ];

    if (hasTypescript && !hasTsDocPlugin) {
        rules.push({
            name: "anolilab/jsdoc/ts-rules",
            files,
            rules: {
                ...jsdocPlugin.configs["flat/contents-typescript-error"].rules,
                ...jsdocPlugin.configs["flat/logical-typescript-error"].rules,
                ...jsdocPlugin.configs["flat/stylistic-typescript-error"].rules,

                ...(stylistic
                    ? {
                          "jsdoc/check-alignment": "warn",
                          "jsdoc/multiline-blocks": "warn",
                      }
                    : {}),
            },
        });
    }

    return rules;
});
