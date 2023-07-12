<?php

// мб эти пути тоже генерировать скриптом
// путь к корню проекта подмодулей
const SUBMODULES_ROOT_PATH = __DIR__ . "/../";
// путь к самим подмодулям 
const SUBMODULES_MODULES_PATH = SUBMODULES_ROOT_PATH . "./submods/";
// путь к скриптам проекта подмодулей
const SUBMODULES_SCRIPTS_PATH = SUBMODULES_ROOT_PATH . "./scripts/";
// путь к конфигам проекта подмодулей
const SUBMODULES_CONF_PATH = SUBMODULES_SCRIPTS_PATH . "./conf/";

require_once SUBMODULES_MODULES_PATH . "./php/confload/ReadConf.php";


function loadModByPath($modulePath) {
    require_once $modulePath;
}


function submodload($moduleName) {
    $SUBMODULE_CONF = readJson(SUBMODULES_CONF_PATH . "cfg.json");
    $submodPathes = readJson($SUBMODULE_CONF["submod_pathes_json"]);
    print_r($SUBMODULE_CONF);
    print_r($submodPathes);
}



if (!debug_backtrace()){

    submodload();

    $envPath = "./../php/logger/simple_class/conf/.env";
    $confPath = "./php/logger/simple_class/conf/.json";
    // $logger = new LogToDB("php-test", $envPath, $confPath);
}