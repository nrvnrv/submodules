var path = require("path");

const SUBMOD_ROOT_DIR = path.resolve(__dirname, '..');
var loader = require(path.resolve(__dirname, '..', 'scripts', 'load.js'));

console.log(a);
console.log(SUBMOD_ROOT_DIR);