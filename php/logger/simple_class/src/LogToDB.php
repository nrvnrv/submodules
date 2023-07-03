<?php

require_once __DIR__ . "/../../../common/ReadConf.php";


class LogToDB {

    private $logSource;
    private $connection, $APP_CONF, $ENV_CONF;
    
    public function __construct($logSource, $envPath, $confPath) {
        $this->logSource = $logSource;
        $this->ENV_CONF = readDotEnv($envPath);
        $this->APP_CONF = readJson($confPath);
        $this->connection = $this->connect();
    }


    public function connect_POSTGRESQL() {
        [$host, $port, $db, $username, $password] = [
            $this->ENV_CONF["POSTGRESQL_HOST"], 
            $this->ENV_CONF["POSTGRESQL_PORT"], 
            $this->ENV_CONF["POSTGRESQL_DATABASE"], 
            $this->ENV_CONF["POSTGRESQL_USERNAME"],
            $this->ENV_CONF["POSTGRESQL_PASSWORD"]
        ];
        $connection = pg_connect("host=$host port=$port dbname=$db user=$username password=$password");
        
        if ($connection) return $connection;
        else throw new \Exception("wrong connection params");
    }
    public function connect() { return $this->connect_POSTGRESQL(); }


    public function checkConnection_POSTGRESQL() {
        if(pg_connection_status($this->connection) === PGSQL_CONNECTION_OK) return TRUE;
        else return FALSE;
    }
    public function checkConnection() { return $this->checkConnection_POSTGRESQL(); }


    private function executeQuery_POSTGRESQL($queryString) {
        $rawResult = pg_query($this->connection, $queryString);
        if(gettype($rawResult) == gettype(false)) $result = $rawResult;
        else $result = pg_fetch_all($rawResult, mode:PGSQL_ASSOC);
        return $result;
    }
    private function executeQuery($queryString) { return $this->executeQuery_POSTGRESQL($queryString); }


    public function createLogMessage($logMessage, $logType) {
        if($this->checkConnection()) {
            $logMessage = str_replace("'", "\\'", $logMessage);
            $logType = str_replace("'", "\\'", $logType);
            $this->executeQuery(
                "INSERT INTO mpe_logs (log_source, log_type, log_message)
                VALUES ('{$this->logSource}', E'{$logType}', E'{$logMessage}')"
            );
        }
        else throw new \Exception("db log no connection");
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

