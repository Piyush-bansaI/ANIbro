import pandas as pd
from sklearn.neighbors import NearestNeighbors
import json
import os
import sqlite3
import numpy as np
from functions import parseJSON

base_dir = os.path.dirname(os.path.abspath(__file__))



mangaData = pd.read_csv(os.path.join(base_dir, "Processed_Data", "Manga.csv"))

MangaDf = pd.DataFrame(mangaData).set_index('id')

cols = MangaDf.columns

n_neighbors = min(100, len(MangaDf))

KNN = NearestNeighbors(n_neighbors=n_neighbors)
KNN.fit(MangaDf)
    

def mangaRecommender(user_genres):

    userVector = pd.Series(0, index=MangaDf.columns)

    userVector['real_genres'] = 1

    for genre in user_genres:
        if genre in cols:
            userVector[genre] = 1

    userVector = userVector.values.reshape(1, -1) #type: ignore

    dist, idx = KNN.kneighbors(userVector)

    recommended_manga_ids = MangaDf.iloc[idx[0]].index.tolist()

    with sqlite3.connect(os.path.join(base_dir, "sql", "manga.db")) as sqlConn:

        dummy_data = ','.join(["?"] * len(recommended_manga_ids))
        query = f"SELECT * FROM manga WHERE id IN ({dummy_data})"

        recommended_manga = pd.read_sql(query, sqlConn, params=recommended_manga_ids)

    

    for col in recommended_manga.columns:
            recommended_manga[col] = recommended_manga[col].apply(parseJSON)

    recommended_manga = recommended_manga[recommended_manga['score'] >= 5]

    recommended_manga = recommended_manga.head(25)

    recommended_manga = recommended_manga.replace({np.nan: None})

    return recommended_manga.to_dict(orient='records')