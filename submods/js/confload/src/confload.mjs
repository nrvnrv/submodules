import path from "path";
import dotenv from "dotenv";
import fs from "fs";

// не чекал работоспособность!

// // conf folder path
// const CONF_FOLDER = 'conf/'
// // conf files pathes
// const ENV_FILE = '.env';
// const APPCONF_FILE = 'mpeappcfg.json';

// import env data
function loadEnv(pathToEnv) {
  const envFullPath = path.resolve(process.cwd(), pathToEnv);
  const ENV_CONF = {};
  dotenv.config({
    path: envFullPath,
    processEnv: ENV_CONF,
  });
  return ENV_CONF;
}

// import json with app cfg
function loadJson(pathToJson) {
  const AppConfFullPath = path.resolve(process.cwd(), pathToJson);
  return JSON.parse(fs.readFileSync(AppConfFullPath, "utf8"));
}

// loadEnv(CONF_FOLDER + ENV_FILE);
// loadJson(CONF_FOLDER + APPCONF_FILE);

export { loadEnv, loadJson };
