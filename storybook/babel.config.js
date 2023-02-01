const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      process.env.NODE_ENV !== "production"
        ? [
            "module-resolver",
            {
              alias: {
                // For development, we want to alias the library to the source
                // ["@gluestack/ui-creator"]: path.join(
                //   __dirname,
                //   "../creator/src"
                // ),
              },
            },
          ]
        : ["babel-plugin-react-docgen-typescript", { exclude: "node_modules" }],
    ],
  };
};
