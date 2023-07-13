<?php

require_once __DIR__ . "/../../../confload/ReadConf.php";
require_once __DIR__ . "/LogToDB.php";


class LogToAll {

    private $connection, $MPE_CONF, $ENV_CONF;

    public function __construct($envPath, $confPath) {
        
    }
    public function createLogMessage($logMessage, $logType) {
        
    }

    public function infoLog($logMessage) { $this->createLogMessage($logMessage, "INFO"); }
    public function noticeLog($logMessage) { $this->createLogMessage($logMessage, "NOTICE"); }
    public function debugLog($logMessage) { $this->createLogMessage($logMessage, "DEBUG"); }
    public function warningLog($logMessage) { $this->createLogMessage($logMessage, "WARNING"); }
    public function errorLog($logMessage) { $this->createLogMessage($logMessage, "ERROR"); }
    public function criticalLog($logMessage) { $this->createLogMessage($logMessage, "CRITICAL"); }
    public function alertLog($logMessage) { $this->createLogMessage($logMessage, "ALERT"); }
    public function emergencyLog($logMessage) { $this->createLogMessage($logMessage, "EMERGENCY"); }
    
}
