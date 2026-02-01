import pandas as pd
import json
from sklearn.neighbors import NearestNeighbors

RawAniDf = None
AniDf = None
cols = None
KNN = None

def loadAnimeData():
    global RawAniDf, AniDf, cols, KNN
    
    if KNN is not None:
        return
    try:
        print("\033[92mLoading Goods\033[0m")

        raw_anime_data = pd.read_json('./Data/AnimeData.json')

        RawAniDf = pd.DataFrame(raw_anime_data).set_index('id')

        AnimeData = pd.read_csv("./Processed_Data/Anime.csv", index_col=['id'])

        AniDf = pd.DataFrame(AnimeData)


        cols = AniDf.columns

        KNN = NearestNeighbors(n_neighbors=3000)

        KNN.fit(AniDf)
    except Exception as e:
        print(e)

def animeRecommender(user_genres: list): # function
    loadAnimeData()

    input_vector = pd.Series(0, index=AniDf.columns) # type: ignore

    input_vector["real_genres"] = 1

    for genre in user_genres:
        if genre in cols:
            input_vector[genre] = 1

    input_vector = input_vector.values.reshape(1, -1) #type: ignore

    dist, idx = KNN.kneighbors(input_vector) # type: ignore

    recommended_anime = RawAniDf.iloc[idx[0]].reset_index() # type: ignore

    recommended_anime = recommended_anime.sort_values(by='score', ascending=False)
    recommended_anime = recommended_anime[recommended_anime['type'] != 'Music']

    recommended_anime = recommended_anime.head(25)

    return json.loads(
        recommended_anime.to_json(orient='records')
    )