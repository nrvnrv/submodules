<?php

// путь к корню проекта подмодулей
const SUBMOD_ROOT_DIR = __DIR__ . "/../";
// путь к скрипту-загрузчику подмодулей
require_once SUBMOD_ROOT_DIR . "/scripts/load.php";

// загружает список указанных подмодулей
$modulesToLoadList = ["logger.simple_class", "common"];
new LoadSubmodule(SUBMOD_ROOT_DIR, $modulesToLoadList);

// TO CONNECT WITH DB ADD ENV FILE IN FOLDER BEFORE EXECUTING SCRIPT!  
const ENV_PATH = __DIR__ . "/conf/.env";
const CONF_PATH = __DIR__ . "/conf/mpeappcfg.json";


// пример работы с модулем logger.simple_class
function ModuleExample_LoggerSimple_class($envPath, $confPath){
    print("\n* * * start ModuleExample_LoggerSimple_class * * *\n");
    $logger = new LogToDB("php-test", $envPath, $confPath);
    $logMessage = "test message from SUBMODULE";
    $logger->infoLog($logMessage);
    $logger->noticeLog($logMessage);
    $logger->debugLog($logMessage);
    $logger->warningLog($logMessage);
    $logger->errorLog($logMessage);
    $logger->criticalLog($logMessage);
    $logger->alertLog($logMessage);
    $logger->emergencyLog($logMessage);
    print("\n- - - finished ModuleExample_LoggerSimple_class - - -\n");
}


// пример работы с модулем common
function ModuleExample_Common(){
    print("\n* * * start ModuleExample_Common * * *\n");
    print_r(createAssocArray(["a"], [1]));
    print_r(getCurrentTimeFromGoogle());
    print("\n- - - finished ModuleExample_Common - - -\n");
}


// запускает примеры  
function phpExamplesMain(){
    ModuleExample_LoggerSimple_class(ENV_PATH, CONF_PATH);
    ModuleExample_Common();
}


if(!debug_backtrace()){
    phpExamplesMain();
}