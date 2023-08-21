# doc for doc

## md files

- Файлы readme и простые инструкции

[Конверт в pdf](https://github.com/normanlorrain/mdpdf)

## sphinx

- Автодокументация python and js

### как начать

Установка:

- [Руководство с оф. сайта](http://https://www.sphinx-doc.org/en/master/usage/installation.html "Руководство с оф. сайта")
- как я делал:
  - python3.11
    - `pip install -U sphinx`

### как собрать

1. запустить терминал/cmd в папке с документацией
1. `pip install -r requirements.txt`
1. run 1. windows
   `make.bat html` 1. linux
   `make html`
1. Открыть build/html/index.html

### как писать

- [Быстрый старт python](https://www.sphinx-doc.org/en/master/tutorial/index.html "Быстрый старт")
- [Как писать документируемый код](https://www.sphinx-doc.org/en/master/tutorial/describing-code.html)

Документация формируется для всех .py фалов проекта (в перспективе и для всех .js). Исключение - файлы в папке doc в корне проекта.

### что не нравится (13.07.2023)

Использую autoapi, для которого указываешь папку в doc/sphinx/source/conf.py и он автоматически парсит все файлы всех подпапок и собирает документацию. Это очень удобно. Минус в том, что хотел бы, чтобы функция в документации имела бы вид `папка1.папка2.имя_файла.имя_функции`, а с autoapi она имеет вид `имя_файла.имя_функции`. Это не удобно, есть гипотеза, что это исправлется в пользовательских шаблонных файлах, которые нужно искать, скачивать, что-то исправлять.
Также формат `папка1.папка2.имя_файла.имя_функции` хорошо формировать с помощью autosummary/autodoc, но там кажется каждую функцию нужно вручную перечислять в .rst файлах, подключаемых к index.rst.

## phpDocumentor

- Автодокументация php

- [Установка](http://https://docs.phpdoc.org/3.0/guide/getting-started/installing.html "Установка")
- [docblock 1](http://https://docs.phpdoc.org/guide/guides/docblocks.html "docblock 1")
- [docblock 2 ru](http://http://omurashov.ru/docblock-in-php-documentation/ "docblock 2 ru")
