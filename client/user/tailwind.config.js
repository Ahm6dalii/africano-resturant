import { content as _content, plugin } from "flowbite-react/tailwind";

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  _content(),
];
export const theme = {
  extend: {},
};
export const plugins = [
  plugin(),
];
