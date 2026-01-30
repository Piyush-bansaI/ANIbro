import pandas as pd
import json
from sklearn.neighbors import NearestNeighbors



raw_anime_data = pd.read_json('./Data/AnimeData.json')

RawAniDf = pd.DataFrame(raw_anime_data).set_index('id')

AnimeData = pd.read_csv("./Processed_Data/Anime.csv", index_col=['id'])

AniDf = pd.DataFrame(AnimeData)


cols = AniDf.columns

KNN = NearestNeighbors(n_neighbors=3000)

KNN.fit(AniDf)

def animeRecommender(user_genres: list): # function

    input_vector = pd.Series(0, index=AniDf.columns)

    input_vector["real_genres"] = 1

    for genre in user_genres:
        if genre in cols:
            input_vector[genre] = 1

    input_vector = input_vector.values.reshape(1, -1) #type: ignore

    dist, idx = KNN.kneighbors(input_vector)

    recommended_anime = RawAniDf.iloc[idx[0]].reset_index()

    recommended_anime = recommended_anime.sort_values(by='score', ascending=False)
    recommended_anime = recommended_anime[recommended_anime['type'] != 'Music']

    recommended_anime = recommended_anime.head(25)

    return json.loads(
        recommended_anime.to_json(orient='records')
    )