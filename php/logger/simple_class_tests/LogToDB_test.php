<?php

# заменить в проекте на реальное местоположение папок
const CONF_FOLDER = __DIR__ . "/conf";
require_once __DIR__ . "../simple_class/LogToDB.php";


function logToDBTestMain() {
    $envPath = CONF_FOLDER . "/.env";
    $confPath = CONF_FOLDER . "/.json";
    $logger = new LogToDB($envPath, $confPath);
}


if (!debug_backtrace()){
    logToDBTestMain();
}