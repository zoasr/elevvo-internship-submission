import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import tseslint from "@typescript-eslint/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			"react/jsx-uses-react": "off",
		},
	},

	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/prop-types": "off", // Disable prop-types if you're using TypeScript
			"react/react-in-jsx-scope": "off", // Not needed in React 17+
			"react/jsx-uses-react": "off", // Not needed in React 17+
			"react/jsx-uses-vars": "error",
			"react/no-unescaped-entities": "warn",
		},
	},
	// @ts-ignore,
	tseslint.configs.recommended,
	// pluginReact.configs.flat.recommended,
	{
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		extends: ["css/recommended"],
	},
	...pluginRouter.configs["flat/recommended"],
]);
