import sqlite3
import os
import pandas as pd
import json

parent_base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
base_dir = os.path.dirname(os.path.abspath(__file__))

anime_data = pd.read_json(os.path.join(parent_base_dir, "Data", "AnimeData.json")).set_index("id")
manga_data = pd.read_json(os.path.join(parent_base_dir, "Data", "MangaData.json")).set_index("id")

for cols in anime_data:
    if anime_data[cols].apply(lambda x: isinstance(x, (dict, list))).any():
        anime_data[cols] = anime_data[cols].apply(json.dumps)

for cols in manga_data:
    if manga_data[cols].apply(lambda x: isinstance(x, (dict, list))).any():
        manga_data[cols] = manga_data[cols].apply(json.dumps)

anime_conn = sqlite3.connect(os.path.join(base_dir, "anime.db"))
anime_data.to_sql("anime", anime_conn, if_exists="replace", index=True, index_label="id")
anime_conn.close()

manga_conn = sqlite3.connect(os.path.join(base_dir, "manga.db"))
manga_data.to_sql("manga", manga_conn, if_exists="replace", index=True, index_label="id")
manga_conn.close()

print("\033[1;94mCreated the DB of SQL\033[0m")