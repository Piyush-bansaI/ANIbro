import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

titles = []

type = 'anime' # toggler from anime to manga

capital_type = type.capitalize()


Data = pd.read_json(f'./Data/{capital_type+"Data"}.json')

df = pd.DataFrame(Data).set_index('id')

titles = df['title']

dynamic_drop = 'producers' if type == 'anime' else 'authors'

df = df.drop(columns=['title_english', 'title_japanese', 'type', 'year', 'rating', 'season', dynamic_drop, 'synopsis', 'title_synonyms', 'status', 'images'])

df["true_score"] = df['score'].notna().astype(int)

df["score"] = df['score'].fillna(df['score'].median())

df = df.drop(columns=['title'])

df['genres'] = df['genres'].apply(
    lambda genre: [g['name'] for g in genre] if isinstance(genre, list) else []
)

genres_expended = df.explode('genres')

df['real_genres'] = df['genres'].apply(lambda genre: len(genre) > 0).astype(int)

genres_expended['genres'] = genres_expended['genres'].fillna("unknown")


df_encoded = pd.get_dummies(genres_expended['genres'], dtype=int)

df_encoded = df_encoded.groupby(df_encoded.index).max()

df = df.drop(columns=['genres']).join(df_encoded)

scaler = StandardScaler()

df['favorites'] = np.log1p(df['favorites'])

scaled = scaler.fit_transform(df[['popularity', 'favorites']])

df_scaled = pd.DataFrame(scaled, index=df.index, columns=['popularity', 'favorites'])

df = df.drop(columns=['popularity', 'favorites'])
df = df.join(df_scaled)

print(df)

df.to_csv(f"./Processed_Data/{capital_type}.csv")

print("\033[1;92msaved the data\033[0m")