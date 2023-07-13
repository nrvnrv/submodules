import os
import json
import re


def getFileList(filepath):

    """
    Сформировать 

    :param filepath: То что будет записано в json
    :type filepath: dict
    :return: res
    :rtype: dict
    """

    fileList = []
    reg = re.compile('[^a-zA-Z0-9~@#$%^-_(){}'':/\.` ]')
    with open(filepath, "r") as f:
        for lines in f:
            fileList.append(reg.sub('', lines))
    return fileList


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


def update_res_dirs(res, field_lvl_1, fields):

    """
    Сформировать словарь res для функции update_pathes.
    Чтобы в словаре было несколько словарей.

    :param res: То что будет записано в json
    :type res: dict
    :param field_lvl_1: Вставляемое в res поле 
    :type field_lvl_1: str
    :param fields: Вставляемый в res словарь
    :type fields: dict
    :return: res
    :rtype: dict
    """

    if field_lvl_1 in res:
        res[field_lvl_1].update(fields)
    else:
        res.update({ field_lvl_1: fields })
        
    return res

def form_artifacts_list(root_folder: str, submod_folder: str, search_dict: dict) -> list:

    """
    Сформировать dict для функции update_pathes

    :param root_folder: Путь к корневой папке репозитория подмодулей
    :type root_folder: str
    :param submod_folder: Путь к папке подмодулей
    :type submod_folder: str
    :param search_dict: [ключ - искомый объект]: значение - флаг искомого объекта. Флаг - файл, который должен находиться в папке с искомым объектом
    :type search_dict: dict
    :return: Содержимое результирующего файла result_json_path
    :rtype: list
    """

    # finded_pathes = {} # найденные пути до папок объектов модулей
    # for searchin_obj in search_dict:
    #     finded_pathes[searchin_obj] = get_dir_of_searching_file(submod_folder, search_dict[searchin_obj])
    # print(json.dumps(finded_pathes, indent = 4))

    # modules_dict = match_module_artifact(finded_pathes)
    # form_json(result_json_path, modules_dict)

    # Список всех файлов всех поддиректорий папки submod_folder
    subpathes_list = os.walk(submod_folder) 
    searched_dirs = [] # формируемый список путей к файлам searching_file

    # поиск путей ко всем файлам searching_file
    for address, dirs, files in subpathes_list:
        address = address[len(root_folder):] # делаем путь относительно корня
        for name in files:
            for obj in search_dict:
                if (search_dict[obj] == name):
                    print(address)
                    searched_dirs.append({
                        'obj': obj, 
                        'path': address
                    })

    # парс путей
    result_pathes = {}
    for i in range(len(searched_dirs)):
        for j in range(len(searched_dirs)):
            if ((i != j) and (searched_dirs[i] != None) and (searched_dirs[j] != None)
                    and (searched_dirs[i]['obj'] in searched_dirs[j]['obj'])
                    and (searched_dirs[i]['path'] in searched_dirs[j]['path'])):
                
                # for subpath in os.path.normpath(searched_dirs[i]['path']).split('\\'):
                #     if():
                #         ...
                # лучше исправить на алгоритмический способ 
                language = os.path.normpath(searched_dirs[i]['path']).split('\\')[1]
                module_name = '.'.join(os.path.normpath(searched_dirs[i]['path']).split('\\')[2:])
                
                result_pathes = update_res_dirs(result_pathes, language, {
                    module_name: {
                        searched_dirs[i]['obj']: {
                            "path": searched_dirs[i]['path'],
                            "file": getFileList(os.path.join(root_folder, searched_dirs[i]['path'], search_dict[searched_dirs[i]['obj']]))
                        },
                        searched_dirs[j]['obj']: {
                            "path": searched_dirs[j]['path'],
                            "file": getFileList(os.path.join(root_folder, searched_dirs[j]['path'], search_dict[searched_dirs[j]['obj']]))
                        },
                        
                }})
                searched_dirs[i] = None
                searched_dirs[j] = None

    for i in range(len(searched_dirs)):
        if (searched_dirs[i] != None):
            language = os.path.normpath(searched_dirs[i]['path']).split('\\')[2]
            module_name = os.path.split(searched_dirs[i]['path'])[1]
            result_pathes = update_res_dirs(result_pathes, language, {
                module_name: {
                    searched_dirs[i]['obj']: {
                            "path": searched_dirs[i]['path'],
                            "file": getFileList(os.path.join(root_folder, searched_dirs[i]['path'], search_dict[searched_dirs[i]['obj']]))
                        },
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