<?php

const SUBMOD_ROOT_DIR = __DIR__ . "/../";
require_once SUBMOD_ROOT_DIR . "/scripts/load.php";

new LoadSubmodule(SUBMOD_ROOT_DIR, ["logger.simple_class"]);

// ADD ENV FILE IN FOLDER BEFORE EXECUTING SCRIPT!  
$envPath = __DIR__ . "/.env";
$confPath = __DIR__ . "/mpeappcfg.json";

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