import { content as _content, plugin } from "flowbite-react/tailwind";
const flowbite = require("flowbite-react/tailwind");

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  _content(),
  flowbite.content(),
  "./node_modules/flowbite/**/*.js"
];
export const theme = {
  extend: {},
};
export const plugins = [
  plugin(),
  require('flowbite/plugin'),
  flowbite.plugin(),

];
