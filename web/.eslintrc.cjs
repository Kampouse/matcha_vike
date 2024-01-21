/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  "extends": ["eslint:recommended", "plugin:solid/recommended", "@repo/eslint-config/index.js"],
	"plugins": ["solid"], 
};
