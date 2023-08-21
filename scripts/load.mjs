import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUBMOD_ROOT_DIR = path.resolve(__dirname, "..");
const CONFLOAD_DIR = path.resolve(
  SUBMOD_ROOT_DIR,
  "submods/js/confload/src/confload.mjs",
);

// const confload = require(CONFLOAD_DIR);
// const SUBMODULES_CONF_PATH = path.resolve(__dirname, 'conf/cfg.json');
// const CONFLOAD_DIR = path.resolve(SUBMOD_ROOT_DIR, 'submods/js/confload/index.js');
// const confload = require(CONFLOAD_DIR);
// import { loadJson } from CONFLOAD_DIR

export class LoadSubmodule {
  constructor(submoodList) {
    // this.submoodRootDir = submoodRootDir;
    this.submoodList = submoodList;
    this.asyncLoadSubmodList()
      .then((result) => {
        console.log(2);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async loadModuleByPath(modulePath) {
    console.log("2");
    console.log(modulePath);
    // let say = await import(modulePath);

    return say;
  }

  async asyncLoadSubmodList() {
    // let say = await import(resolve(__dirname, '..', 'scripts', 'load.mjs'));
    console.log("1");
    console.log(resolve(SUBMOD_ROOT_DIR, "..", "scripts", "load.mjs"));
    let say = await this.loadModuleByPath(CONFLOAD_DIR);
    console.log("3");
    console.log(say.loadJson(SUBMODULES_CONF_PATH));
    // for(let submod submoodList)
  }
}

let loadder = new LoadSubmodule();
// module.exports = { LoadSubmodule };
