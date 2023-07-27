
// const SUBMOD_ROOT_DIR = path.resolve(__dirname, '..');
// const path = require('path');
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(path.resolve(__dirname, '..', 'scripts', 'load.js'));
// var loader = require(path.resolve(__dirname, '..', 'scripts', 'load.mjs'));

console.log(resolve(__dirname, '..', 'scripts', 'load.mjs'));
let say = await import(resolve(__dirname, '..', 'scripts', 'load.mjs'));
// console.log(loader);
