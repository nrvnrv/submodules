import json


def read_json(json_file_path, env_file_path):
    """
    Return a list of mpe_config and env_config
    :param kind: env_file_path, env_file_path
    :type kind: str or None
    :return: mpe_config and env_config
    :rtype: list[dict, dict]
    """

    json_file = open(json_file_path, "r", encoding="utf-8")
    APP_CONFIG = json.load(json_file)
    ENV_CONFIG = dotenv_values(env_file_path)
    return [APP_CONFIG, ENV_CONFIG]


def jsonprint(printable: json):
    print(json.dumps(printable, indent=4))
