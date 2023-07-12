import json

def jprint(printable: json):
    print(json.dumps(printable, indent=4))