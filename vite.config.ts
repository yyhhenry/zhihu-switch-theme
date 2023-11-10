import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    banner({
      content: `
// ==UserScript==
// @name         ${pkg.name}
// @namespace    http://tampermonkey.net/
// @version      ${pkg.version}
// @description  ${pkg.description.replaceAll('\n', ' ')}
// @author       ${pkg.author.email}
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// @noframes
// @homepage     https://github.com/yyhhenry/${pkg.name}
// ==/UserScript==
  `.trim(),
      verify: false,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: ['src/index.ts'],
      formats: ['es'],
      fileName: `${pkg.name}.user`,
    },
  },
});
