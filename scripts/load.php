<?php


class LoadSubmodule {

    private array $submodList;
    private string $submoodRootDir;

    // путь к корню проекта подмодулей
    const SUBMODULES_ROOT_PATH = __DIR__ . "/../";
    // путь к конфигам проекта подмодулей
    const SUBMODULES_CONF_PATH = __DIR__ . "/conf/cfg.json";

    private array $SUBMODULES_CONF; // конфиги
    private array $SUBMODULES_PATHES; // подмодули


    public function __construct(string $submoodRootDir, array $list) {

        // подключить ф-и чтения конфигов и прочитать конфиги
        $this->loadModuleByPath(LoadSubmodule::SUBMODULES_ROOT_PATH . "submods/php/confload/ReadConf.php");
        $this->SUBMODULES_CONF = readJson(LoadSubmodule::SUBMODULES_CONF_PATH);
        $this->SUBMODULES_PATHES = readJson(LoadSubmodule::SUBMODULES_ROOT_PATH . $this->SUBMODULES_CONF['submod_pathes_json']);

        $this->submoodRootDir = $submoodRootDir;
        $this->submodList = $list;

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
                                $this->loadModuleByPath($this->submoodRootDir . $this->SUBMODULES_PATHES['php'][$submod][$artifacts]["path"] . "/" . $srcFile);
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