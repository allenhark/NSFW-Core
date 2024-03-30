//load all files in this directory and export them
import { readdirSync } from "fs";
import { join } from "path";
const files = readdirSync(__dirname);
const modules = files
  .filter((file) => file !== "index.ts")
  .map((file) => require(join(__dirname, file)).default);

export default modules;
