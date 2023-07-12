import os
import json


def get_dir_of_searching_file(folder: str, searching_file: str):

    """
    (not used now) Найти пути ко всем файлам с именем searching_file 
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
            if (searching_file == name):
                searched_dirs.append(address)
    return searched_dirs


def form_artifacts_list(base_folder: str, search_dict: dict) -> list:

    """
    Сформировать dict для функции update_pathes

    :param base_folder: Путь к корневой папке репозитория подмодулей
    :type base_folder: str
    :param search_dict: [ключ - искомый объект]: значение - флаг искомого объекта. Флаг - файл, который должен находиться в папке с искомым объектом
    :type search_dict: dict
    :return: Содержимое результирующего файла result_json_path
    :rtype: list
    """

    # finded_pathes = {} # найденные пути до папок объектов модулей
    # for searchin_obj in search_dict:
    #     finded_pathes[searchin_obj] = get_dir_of_searching_file(base_folder, search_dict[searchin_obj])
    # print(json.dumps(finded_pathes, indent = 4))

    # modules_dict = match_module_artifact(finded_pathes)
    # form_json(result_json_path, modules_dict)

    # Список всех файлов всех поддиректорий папки base_folder
    subpathes_list = os.walk(base_folder) 
    searched_dirs = [] # формируемый список путей к файлам searching_file
    # поиск путей ко всем файлам searching_file
    for address, dirs, files in subpathes_list:
        for name in files:
            for obj in search_dict:
                if (search_dict[obj] == name):
                    searched_dirs.append({'obj': obj, 'path': address})


    result_pathes = []
    for i in range(len(searched_dirs)):
        for j in range(len(searched_dirs)):
            if ((i != j) and (searched_dirs[i] != None) and (searched_dirs[j] != None)
                and (searched_dirs[i]['obj'] in searched_dirs[j]['obj'])
                and (searched_dirs[i]['path'] in searched_dirs[j]['path'])):
                    module_name = os.path.split(searched_dirs[i]['path'])[1]
                    result_pathes.append({module_name: {
                        searched_dirs[i]['obj']: searched_dirs[i]['path'],
                        searched_dirs[j]['obj']: searched_dirs[j]['path']
                    }})
                    searched_dirs[i] = None
                    searched_dirs[j] = None

    for i in range(len(searched_dirs)):
        if (searched_dirs[i] != None):
            module_name = os.path.split(searched_dirs[i]['path'])[1]
            result_pathes.append({module_name: {
                searched_dirs[i]['obj']: searched_dirs[i]['path'],
            }})
            searched_dirs[i] = None
    return result_pathes


def form_json_file(json_to_save, json_path: str):
    """
    Сохранить json в json файл

    :param json_to_save: Содержимое файла
    :type json_to_save: json
    :param json_path: Путь к файлу
    :type json_path: str
    :return: None
    """
    with open(json_path, "w", encoding="utf-8") as json_file:
        json.dump(json_to_save, json_file)
        json_file.close()