module.exports = {
    extends: ["plugin:yml/standard"],
    overrides: [
        {
            files: ["*.yaml", "*.yml"],
            parser: "yaml-eslint-parser",
            rules: {
                "spaced-comment": "off",
            },
        },
    ],
};