import requests
import json
import time
import winsound

Manga_data = []

page = 1

while True:
    try:
        jiken_URL = f"https://api.jikan.moe/v4/manga?page={page}"
        res = requests.get(jiken_URL)

        if res.status_code == 429:
            print("\033[91mthey rate limited on me 😕\033[0m")
            continue

        if res.status_code == 200:
            data = res.json().get('data', [])

            if len(data) > 0 and page <= 2000:
                for i in data:
                    Manga_data.append({
                        'id': i['mal_id'],
                        'title': i['title'],
                        'title_english': i['title_english'],
                        'title_japanese': i['title_japanese'],
                        'synopsis': i['synopsis'],
                        'images': i['images'],
                        'status': i['status'],
                        'title_synonyms':i['title_synonyms'],
                        'authors':i['authors'],
                        'type':i['type'],
                        'score': i['score'],
                        'popularity': i['popularity'],
                        'favorites': i['favorites'],
                        'genres': i['genres']
                    })
                print(f"\033[3;92mgot page-{page}\033[0m")
                page += 1
                time.sleep(0.7)

            else:
                print("\033[1;95mAll 2000 Manga aquired\033[0m")
                break
    except Exception as e:
        print(e)
            
with open('Data/MangaData.json', 'w', encoding='utf-8') as f:
    json.dump(Manga_data, f, indent=2)

winsound.PlaySound(r"C:/Users/Piyush/Music/sounds/luffy_eyecatcher.wav", winsound.SND_FILENAME)
