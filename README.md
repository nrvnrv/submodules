# submodules

common modules for microservices.

cfg.json - submodules project configs.

## Proj structure

* PL (php)
    * component (logger)
        * submodule (simple-class)
            * code and includdin files - ./ or src etc (src)

## Creating new module

* Init your module by ***.is_a_\*\*\**** files

    * to init module folder place ***.is_a_module*** file in module folder
    * to init include folder place ***.is_a_src*** file in folder with includding files

* Explain how to use your module

    * Put in ***.is_a_\*\*\**** files instructions that progger should to do to use your module and src (pip/composer/npm install, put conf file etc) or fill instruction in module ***README*** file

* After adding your modules

    * run ***update_pathes.py*** script in the root folder "submodule" repo

## Adding module in proj

### Git guide

[submodules](https://git-scm.com/book/ru/v2/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-Git-%D0%9F%D0%BE%D0%B4%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8 "guide")

### Git guide btiefly

* To add new submodule in folder (service) where u wanna use submodule in cmd run cmd below to load submodule repo:

`git submodule add ssh://git@gitlab.gsmk.ru:2222/iad/mpe_submodules.git`

* To add submodule in clonning repo:

      git clone ssh://git@gitlab.gsmk.ru:2222/<your_proj_name>.git
      git submodule init
      git submodule update

	or

      git clone --recurse-submodules ssh://git@gitlab.gsmk.ru:2222/<your_proj_name>.git


