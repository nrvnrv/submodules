import os
import json


def get_dir_of_searching_file(folder, searching_file):
    """
    Найти пути ко всем файлам с именем searching_file 
    во всех подпапках папки folder.
    :param folder: Путь к папке в поддиректориях которой будет осуществляться поиск
    :type folder: str
    :param searching_file: Имя по которому будет произведен поиск
    :type searching_file: str
    :return: Список путей поддиректорий папки folder по которым найден файл
    :rtype: list[str]
    """
    # Список всех файлов всех поддиректорий папки folder
    subpathes_list = os.walk(folder) 
    searched_dirs = [] # формируемый список путей к файлам searching_file
    # поиск путей ко всем файлам searching_file
    for address, dirs, files in subpathes_list:
        for name in files:
            if (searching_file in name):
                searched_dirs.append(address)
    return searched_dirs


def match_module_and_src(modules_list, src_list, ):
    result = {}
    for module_dir in modules_list:
        for src_dir in src_list:
            if module_dir in src_dir:
                module_name = os.path.split(module_dir)[1]
                # os.path.join
                result[module_name] = {
                    "pathes": {
                        "module": module_dir, 
                        "src": src_dir
                    }
                }
    return result


def form_json(json_path, dict_to_save):
    with open(json_path, "w", encoding="utf-8") as json_file:
        json.dump(dict_to_save, json_file)


def update_pathes(result_json_path = "./pathes.json", base_folder = "./", 
                    file_to_search_component = ".is_a_component", 
                    file_to_search_modules = ".is_a_module", 
                    file_to_search_src = ".is_a_src"
    ):

    component_list = get_dir_of_searching_file(base_folder, file_to_search_component)
    modules_list = get_dir_of_searching_file(base_folder, file_to_search_modules)
    src_list = get_dir_of_searching_file(base_folder, file_to_search_src)
    
    modules_dict = match_module_and_src(modules_list, src_list)

    form_json(result_json_path, modules_dict)

    print(component_list)
    print(modules_list)
    print(src_list)
    print(modules_dict)


def update_pathes_main():

    SUBMODULES_CONF_JSON_PATH = "./conf/cfg.json" # файл с конифгами проекта подмодулей
    repo_root = './../' # корневая папка репозитория
    current_folder = os.getcwd()

    with open(SUBMODULES_CONF_JSON_PATH) as f:
        SUBMODULES_CONF = json.load(f)
    
    SEARCH_DICT = {
        "component": SUBMODULES_CONF['PATH']['FLAG']['component'],
        "module": SUBMODULES_CONF['PATH']['FLAG']['module'],
        "src": SUBMODULES_CONF['PATH']['FLAG']['src']
    }

    # update_pathes(
    #     result_json_path = SUBMODULES_CONF['PATH']['submod_pathes_json'], 
    #     base_folder = base_folder, SEARCH_DICT)


if __name__ == "__main__":
    update_pathes_main()