<?php

require_once __DIR__ . "/php/common/ReadConf.php";


function loadModByPath($modulePath) {
    require_once $modulePath;
}


function loadsubmod($moduleName) {
    $submodConf = readJson("cfg.json");
    $submodPathes = readJson($submodConf["submod_pathes_json"]);
    print_r($submodConf);
    print_r($submodPathes);
}


if (!debug_backtrace()){

    loadsubmod();

    $envPath = "./php/logger/simple_class/conf/.env";
    $confPath = "./php/logger/simple_class/conf/.json";
    // $logger = new LogToDB("php-test", $envPath, $confPath);
}