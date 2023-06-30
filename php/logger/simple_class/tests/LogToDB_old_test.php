<?php

# заменить в проекте на реальное местоположение папок
const CONF_FOLDER = __DIR__ . "/../conf";
require_once __DIR__ . "/../src/LogToDB.php";


function logToDBTestMain() {

    $envPath = CONF_FOLDER . "/.env";
    $confPath = CONF_FOLDER . "/.json";
    $logger = new LogToDB("php-test", $envPath, $confPath);

    $logMessage = "test message LogToDB";
    $logger->infoLog($logMessage);
    $logger->noticeLog($logMessage);
    $logger->debugLog($logMessage);
    $logger->warningLog($logMessage);
    $logger->errorLog($logMessage);
    $logger->criticalLog($logMessage);
    $logger->alertLog($logMessage);
    $logger->emergencyLog($logMessage);

}


if (!debug_backtrace()){
    logToDBTestMain();
}