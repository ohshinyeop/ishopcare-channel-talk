import prettierPlugin from "eslint-plugin-prettier";
import { default as pluginReact, default as react } from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { ignores: ["dist", "scripts"] }, // 'dist' 디렉토리는 ESLint 검사를 무시
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 지원
      globals: globals.browser, // 브라우저 전역 변수 허용
      parserOptions: {
        ecmaVersion: "latest", // 최신 ECMAScript 버전 지원
        ecmaFeatures: { jsx: true }, // JSX 지원
        sourceType: "module", // ECMAScript 모듈 사용
      },
    },
    settings: {
      react: { version: "19.0" }, // React 버전 감지
    },
    plugins: {
      react,
      "react-hooks": reactHooks, // React Hooks 플러그인
      "react-refresh": reactRefresh, // React Fast Refresh 플러그인
      prettier: prettierPlugin, // Prettier 플러그인 추가
    },
    rules: {
      ...react.configs.recommended.rules, // React 추천 규칙 적용
      ...react.configs["jsx-runtime"].rules, // JSX 런타임 관련 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
      "react/jsx-no-target-blank": "off", // target="_blank" 보안 경고 비활성화
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": "error", // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
      "no-console": "error",
      rules: {
        // rules에 다음과 같이 추가
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
      },
    },
  },
];
