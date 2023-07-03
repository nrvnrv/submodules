import os
import json


def get_dir_of_searching_file(folder, searching_file):
    subpathes_list = os.walk(folder)
    searched_dirs = []
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


def update_pathes(result_json_path = "./pathes.json", current_folder = "./", 
                    file_to_search_modules = ".is_a_module", file_to_search_src = ".is_a_src"):
    modules_list = get_dir_of_searching_file(current_folder, file_to_search_modules)
    src_list = get_dir_of_searching_file(current_folder, file_to_search_src)
    modules_dict = match_module_and_src(modules_list, src_list)
    form_json(result_json_path, modules_dict)
    print(modules_list)
    print(src_list)
    print(modules_dict)


if __name__ == "__main__":
    result_json_path = "./pathes.json"
    current_folder = "./" # os.getcwd()
    file_to_search_component = ".is_a_component"
    file_to_search_modules = ".is_a_module"
    file_to_search_src = ".is_a_src"
    update_pathes(result_json_path, current_folder, file_to_search_component, file_to_search_modules, file_to_search_src)
