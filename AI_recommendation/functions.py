import json

def parseJSON(s):
    if isinstance(s, str):
        try:
            loaded = json.loads(s)
            if isinstance(loaded, str):
                try:
                    return json.loads(loaded)
                except:
                    return loaded
            return loaded
        except:
            return s 
    return s 