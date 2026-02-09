import pandas as pd
from sklearn.neighbors import NearestNeighbors
import json
import os

base_dir = os.path.dirname(os.path.abspath(__file__))


rawMangaData = pd.read_json(os.path.join(base_dir, "Data", "MangaData.json"))
mangaData = pd.read_csv(os.path.join(base_dir, "Processed_Data", "Manga.csv"))

rawMangaDf = pd.DataFrame(rawMangaData).set_index('id')
MangaDf = pd.DataFrame(mangaData).set_index('id')

cols = MangaDf.columns

n_neighbors = min(100, len(MangaDf))

KNN = NearestNeighbors(n_neighbors=n_neighbors)
KNN.fit(MangaDf)
    

def mangaRecommender(user_genres):

    userVector = pd.Series(0, index=MangaDf.columns) # type: ignore

    userVector['real_genres'] = 1

    for genre in user_genres:
        if genre in cols:
            userVector[genre] = 1

    userVector = userVector.values.reshape(1, -1) #type: ignore

    dist, idx = KNN.kneighbors(userVector) # type: ignore

    recommended_manga = rawMangaDf.iloc[idx[0]].reset_index() # type: ignore

    recommended_manga = recommended_manga[recommended_manga['score'] >= 5]

    recommended_manga = recommended_manga.head(25)

    return json.loads(
        recommended_manga.to_json(orient='records')
    )