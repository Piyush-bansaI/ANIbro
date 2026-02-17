import pandas as pd
import sqlite3
from sklearn.neighbors import NearestNeighbors
import json
import os
from functions import parseJSON
base_dir = os.path.dirname(os.path.abspath(__file__))

AnimeData = pd.read_csv(os.path.join(base_dir, 'Processed_Data', 'Anime.csv'), index_col=['id'])

AniDf = pd.DataFrame(AnimeData)


cols = AniDf.columns

n_neighbors = min(3000, len(AniDf))

KNN = NearestNeighbors(n_neighbors=n_neighbors)

KNN.fit(AniDf)
    

def animeRecommender(user_genres: list): # function

    input_vector = pd.Series(0, index=AniDf.columns)

    input_vector["real_genres"] = 1

    for genre in user_genres:
        if genre in cols:
            input_vector[genre] = 1

    input_vector = input_vector.values.reshape(1, -1) #type: ignore

    dist, idx = KNN.kneighbors(input_vector)

    recommended_anime_ids = AniDf.iloc[idx[0]].index.tolist()

    recommended_anime_scores = []

    with sqlite3.connect(os.path.join(base_dir, "sql", "anime.db")) as sqlConn:
        batch_size = 900

        for i in range(0, len(recommended_anime_ids), batch_size):
            batch_id = recommended_anime_ids[i:i+batch_size]
            dummy_data = ",".join(["?"] * len(batch_id))
            query = f"SELECT id, score, type FROM anime WHERE id in ({dummy_data})"
            recommended_anime_scores.append(pd.read_sql(query, sqlConn, params=batch_id))

        recommended_anime = pd.concat(recommended_anime_scores, ignore_index=True)

        recommended_anime = recommended_anime.sort_values(by='score', ascending=False)
        recommended_anime = recommended_anime[recommended_anime['type'] != 'Music']

        recommended_anime = recommended_anime['id'].head(25).tolist()

        placeholder = ",".join(["?"] * len(recommended_anime))
        query = f"SELECT * FROM anime WHERE id IN ({placeholder})"

        top_25_anime = pd.read_sql(query, sqlConn, params=recommended_anime)
 
    for col in top_25_anime.columns:
             
            top_25_anime[col] = top_25_anime[col].apply(parseJSON)

    top_25_anime = top_25_anime.fillna(value=None)

    return top_25_anime.to_dict(orient='records')