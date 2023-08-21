<?php

/**
 * Загрузчик подмодулей
 *
 * ...
 */

function wp_normalize_path( $path ) {
    $path = str_replace( '\\', '/', $path );
    $path = preg_replace( '|(?<=.)/+|', '/', $path );
    if ( ':' === substr( $path, 1, 1 ) ) {
        $path = ucfirst( $path );
    }
    return $path;
}

class LoadSubmodule {

    private array $submodList;
    private string $submoodRootDir;

    /** @var const $SUBMODULES_ROOT_PATH путь к корню проекта подмодулей */
    private const SUBMODULES_ROOT_PATH = __DIR__ . "/../";
    /** @var const $SUBMODULES_ROOT_PATH путь к конфигам проекта подмодулей */
    private const SUBMODULES_CONF_PATH = __DIR__ . "/conf/cfg.json";

    /** @var array $SUBMODULES_CONF конфиги приложения подмодулей */
    private array $SUBMODULES_CONF; 
    /** @var array $SUBMODULES_PATHES пути к подмодулям */
    private array $SUBMODULES_PATHES;


    public function __construct(string $submoodRootDir, array $submoodList) {

        // подключить ф-и чтения конфигов и прочитать конфиги
        $this->loadModuleByPath(LoadSubmodule::SUBMODULES_ROOT_PATH . "submods/php/confload/ReadConf.php");
        $this->SUBMODULES_CONF = readJson(LoadSubmodule::SUBMODULES_CONF_PATH);
        $this->SUBMODULES_PATHES = readJson(LoadSubmodule::SUBMODULES_ROOT_PATH . $this->SUBMODULES_CONF['submod_pathes_json']);

        $this->submoodRootDir = $submoodRootDir;
        $this->submodList = $submoodList;

        $this->loadSubmodList();
    }


    private function loadSubmodList() {
        if ($this->submodList !== []) {
            foreach($this->submodList as $submod) {
                if(!array_key_exists($submod, $this->SUBMODULES_PATHES['php'])) throw new Exception("{$submod} not exist in submodules");
                if($submod !== '') {
                    foreach(array_keys($this->SUBMODULES_CONF['SUBMODS_FLAGS']) as $artifacts) {
                        if(array_key_exists($artifacts, $this->SUBMODULES_PATHES['php'][$submod])) {
                            foreach($this->SUBMODULES_PATHES['php'][$submod][$artifacts]["file"] as $srcFile) {
                                $filePath = wp_normalize_path($this->submoodRootDir . "/" . $this->SUBMODULES_PATHES['php'][$submod][$artifacts]["path"] . "/" . $srcFile);
                                // echo $filePath . "\n";
                                $this->loadModuleByPath($filePath);
                            }
                        }
                    }
                }
            }
        }
    }


    // импорт модуля 
    private function loadModuleByPath($modulePath) {
        // print_r($modulePath);
        if (is_readable($modulePath)) require_once $modulePath;
        // else throw new Exception("check {$modulePath} ");
    }

    // установка библиотек композера
    private function composerInstall() {}
    // установка зависимостей
    private function installDependencies() {}


}
