const CopyModulesPlugin = require("copy-modules-webpack-plugin");

module.exports = function override(config, env) {
    config.plugins = [
        ...config.plugins,
        new CopyModulesPlugin({
            destination: "webpack-modules",
            includePackageJsons: true,
        }),
    ];
    return config;
};