import os
import json
from src.py.update_funcs import form_artifacts_list, form_json_file


def update_pathes(
    root_folder: str, submod_folder: str, search_dict: dict, result_json_path_list: list
) -> list:
    """
    Формирует json и сохраняет в файлы, указанные в result_json_path_list.
    Json содержит перечень доступных модулей и их артефакты - папки с исходными кодами, подключаемыми файлами. Формат json:\n
    {\n
        "язык программирования": {\n
            "имя модуля": {\n
                "вид артефакта (определяется в cfg.json)": {\n
                    "path": "путь к папке артефакта",\n
                    "file": [\n
                        файл артефакта 1, ..., файл артефакта N\n
                    ]\n
                }\n
            }\n
        }\n
    }\n

    :param root_folder: Путь к корневой папке репозитория подмодулей
    :type root_folder: str
    :param submod_folder: Путь к папке с самими подмодулями
    :type submod_folder: str
    :param search_dict: ["ключ - искомый объект"]: "значение - флаг искомого объекта". Ключ - вид артефакта. Флаг - файл, который должен находиться в папке с искомым объектом
    :type search_dict: dict
    :param result_json_path_list: Пути к формируемым path-файлам
    :type result_json_path_list: list
    :return: Содержимое результирующего файла result_json_path
    :rtype: list
    """

    # формируем словарь (формат см описание ф-ии)
    artifacts_list = form_artifacts_list(root_folder, submod_folder, search_dict)

    # сохраняем полученный словарь в указанные файлы
    for result_json_path in result_json_path_list:
        form_json_file(artifacts_list, result_json_path)

    return artifacts_list


def update_pathes_main(
    repo_root: str, submodules_conf_json_path: str, result_json_path_list: list = []
) -> list:
    """
    Формирует параметры функции :func:`update_pathes.update_pathes` и вызывает ее

    :param repo_root: Путь к корневой папке репозитория подмодулей
    :type repo_root: str
    :param submodules_conf_json_path: путь к конфигурационному фалу проекта подмодулей
    :type submodules_conf_json_path: str
    :param result_json_path_list: Список путей по которым сохранять полученный path-файл
    :type result_json_path_list: list
    :return: Содержимое результирующего файла result_json_path (см :func:`update_pathes.update_pathes`)
    :rtype: list
    """

    # читаем конфиги
    with open(submodules_conf_json_path) as f:
        SUBMODULES_CONF = json.load(f)

    # путь к папке с подмодулями
    submod_folder = repo_root + SUBMODULES_CONF["submodules_folder"]
    # папка текущего скрипта
    current_script_folder = os.path.dirname(os.path.abspath(__file__))
    current_exec_folder = os.getcwd()  # папка откуда запускается скрипт

    # задаем структуру того что будем искать
    # [ключ - искомый объект]: значение - файл-флаг искомого объекта
    # SEARCH_DICT = {
    #     "component": SUBMODULES_CONF['PATH']['SUBMODS_FLAGS']['component'],
    #     "module": SUBMODULES_CONF['PATH']['SUBMODS_FLAGS']['module'],
    #     "module_include": SUBMODULES_CONF['PATH']['SUBMODS_FLAGS']['module_include'],
    #     "module_src": SUBMODULES_CONF['PATH']['SUBMODS_FLAGS']['module_src']
    # }
    # определяется в конифгах
    SEARCH_DICT = SUBMODULES_CONF["SUBMODS_FLAGS"]

    # также сохраняем в папку конфигов
    result_json_path_list.append(repo_root + SUBMODULES_CONF["submod_pathes_json"])

    # обновляем пути к искомым объектам
    artifacts_list = update_pathes(
        root_folder=repo_root,  # корень проекта
        submod_folder=submod_folder,  # где искать
        search_dict=SEARCH_DICT,  # что искать
        result_json_path_list=result_json_path_list,  # куда сохранять
    )

    return artifacts_list


if __name__ == "__main__":
    # корневая папка репозитория
    repo_root = "../"
    # файл с конифгами проекта подмодулей
    SUBMODULES_CONF_JSON_PATH = "./conf/cfg.json"
    update_pathes_main(repo_root, SUBMODULES_CONF_JSON_PATH)
