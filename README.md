# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and Biome checks.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Biome

Biome is configured in `biome.json` for formatting, linting, and import organization.

Use `npm run lint` to run `biome check .`, or `npm run format` to format files.
