import { content as _content, plugin } from "flowbite-react/tailwind";
const flowbite = require("flowbite-react/tailwind");

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  _content(),
  flowbite.content(),
  "./node_modules/flowbite/**/*.js"
];
export const theme = {
  extend: {
    backgroundImage: {
      'catBack': "url('./src/assets/affricanoImg/bg2.jpg')",
      'catBackLight': "url('./src/assets/affricanoImg/bg-light.webp')",
    }
  },
};
export const plugins = [
  plugin(),
  require('flowbite/plugin'),
  flowbite.plugin(),

];
