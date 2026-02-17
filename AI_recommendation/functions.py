import json

def parseJSON(s):
    if isinstance(s, str):
        try:
            return json.loads(s)
        except:
            return s 
    return s 