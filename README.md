# submodules

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Different styles for different languages.
Common modules for microservices.

## Proj structure

**submodules/**

├───doc **_[project doc]_**

│ ├───phpDocumentor **_[php doc]_**

│ └───sphinx **_[py, js doc]_**

├───example **_[how to work with this proj]_**

├───scripts **_[to add new submods and include in your proj]_**

└───submods **_[folder with submods - see below]_**

**./scripts/conf/cfg.json** - submodules project configs.

**Submods folder structure**

- all submods folder
  - prog. language folder - submodule folder - submodule realisation folder - code and includdin files - ./ or src etc

**Submods folder example**

- submods
  - php
    - logger
      - simple-class
        - src/LogToDB.php

## Creating new module

- write code
- Init your module by **\_.is**a**\_\*\*\*** files

  - to init module folder place **_.is_a_module_** file in module folder
  - to init include folder place **_.is_a_src_** file in folder with includding files

* Explain how to use your module

  - Put in **\*.is*a*\*\*\*\*** files instructions that progger should to do to use your module and src (pip/composer/npm install, put conf file etc) or fill instruction in module **_README_** file

* After adding your modules

  - run **_update_pathes.py_** script in the script folder

## Adding module in proj

### Git guide

[submodules](https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%9F%D0%BE%D0%B4%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8 "guide")

### Git guide btiefly

- To add new submodule in folder (service) where u wanna use submodule in cmd run cmd below to load submodule repo:

`git submodule add ssh://git@gitlab.gsmk.ru:2222/iad/mpe_submodules.git`

- To add submodule in clonning repo:

      git clone ssh://git@gitlab.gsmk.ru:2222/<your_proj_name>.git
      git submodule init
      git submodule update

  or

      git clone --recurse-submodules ssh://git@gitlab.gsmk.ru:2222/<your_proj_name>.git

- To update git submodules:

  - update separate git submod in git submod folder:

    git fetch
    git merge

  - update all git submods in proj root:

    git submodule update --remote
