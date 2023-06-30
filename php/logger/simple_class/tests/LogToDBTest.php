<?php declare(strict_types=1);

const CONF_FOLDER = __DIR__ . "/../conf";
require_once __DIR__ . "/../src/LogToDB.php";

use PHPUnit\Framework\TestCase;
// use PHPUnit\DbUnit\TestCaseTrait;

final class LogToDBTest extends TestCase {

    // use TestCaseTrait;

    // public function getConnection()
    // {
    //     $pdo = new PDO('pg::memory:');
    //     return $this->createDefaultDBConnection($pdo, ':memory:');
    // }

    public function testCanSuccessfullyConnectWithDb(): void {
        $envPath = CONF_FOLDER . "/.env";
        $confPath = CONF_FOLDER . "/.json";
        $logger = new LogToDB("php-test", $envPath, $confPath);
        $this->assertSame(TRUE, $logger->checkConnection());
    }


    public function testCanotConnectWithDbByWrongEnv(): void {
        $envPath = CONF_FOLDER . "/.example_env";
        $confPath = CONF_FOLDER . "/.json";
        $this->expectException(Exception::class);
        $logger = new LogToDB("php-test", $envPath, $confPath);
    }


    // что-то с phpUnit
    // https://phpunit-documentation-russian.readthedocs.io/ru/latest/database.html
    // public function testCanCreateLogSuccessfull(): void {
    //     $envPath = CONF_FOLDER . "/.env";
    //     $confPath = CONF_FOLDER . "/.json";
    //     $logger = new LogToDB("php-test", $envPath, $confPath);
    //     $logger->createLogMessage("test", "php");
    // }

    

}