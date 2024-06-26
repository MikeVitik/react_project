// https://github.com/NiGhTTraX/ts-monorepo#create-react-app
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  webpack: {
    configure: (config) => {
      // Remove the ModuleScopePlugin which throws when we
      // try to import something outside of src/.
      config.resolve.plugins.pop();

      // Resolve the path aliases.
      config.resolve.plugins.push(new TsconfigPathsPlugin());

      // Let Babel compile outside of src/.
      const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
      const tsRule = oneOfRule.oneOf.find((rule) =>
        rule.test.toString().includes("ts|tsx")
      );
      tsRule.include = undefined;
      tsRule.exclude = /node_modules/;

      return config;
    },
    // jest: {
    //   configure: {
    //     preset: "ts-jest",

    //     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    //       // This has to match the baseUrl defined in tsconfig.json.
    //       prefix: "<rootDir>/",
    //     }),
    //   },
    // },
  },
};
