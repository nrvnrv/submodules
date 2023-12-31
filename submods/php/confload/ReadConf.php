<?php


function readJson($jsonPath) {
    if (!file_exists($jsonPath)) throw new Exception("file not found: $jsonPath");
    $confData = file_get_contents($jsonPath);
    $jsonConf = json_decode($confData, true);
    if($jsonConf === false){} // TODO: smth error
    else return $jsonConf; 
}


function readDotEnv($envPath) {
    if (!file_exists($envPath)) throw new Exception("file not found: $envPath");
    $lines = file($envPath);
    $envConf = [];
    foreach ($lines as $line) {
        $line = trim($line, " \n\r\t\v\x00");
        if(($line != '') and (mb_substr($line, 0, 1) != "#")){
            [$key, $value] = explode('=', $line, 2);
            $key = trim($key, " \n\r\t\v\x00'\"");
            $value = trim($value, " \n\r\t\v\x00'\"");
            $envConf[$key] = $value;
        }
    }
    return $envConf;
}