<?php

require_once __DIR__ . "/commonFunctions.php";


class LogToDB {

    private $connection, $MPE_CONF, $ENV_CONF;

    public function __construct($envPath, $confPath) {
        $this->ENV_CONF = readDotEnv($envPath);
        $this->MPE_CONF = readJsonConf($confPath);
        $this->connection = $this->connect();
    }


    public function connect() {
        [$host, $port, $db, $username, $password] = 
        [
            $this->ENV_CONF["POSTGRESQL_HOST"], 
            $this->ENV_CONF["POSTGRESQL_PORT"], 
            $this->ENV_CONF["POSTGRESQL_DATABASE"], 
            $this->ENV_CONF["POSTGRESQL_USERNAME"],
            $this->ENV_CONF["POSTGRESQL_PASSWORD"]
        ];
        return pg_connect("host=$host port=$port dbname=$db user=$username password=$password");
    }
}


