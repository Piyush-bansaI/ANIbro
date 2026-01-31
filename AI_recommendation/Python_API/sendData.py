from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
from dotenv import load_dotenv
load_dotenv()

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from AnimeRecommender import animeRecommender
from MangaRecommender import mangaRecommender

app = Flask(__name__)
CORS(app, origins=[os.environ.get("BACKEND_URL"), "http://localhost:3000/"]) # type: ignore

@app.get('/')
def Running():
    return {
        "status": 200,
        "message": "Server Running"
    }

@app.post('/recommend-anime')
def recommendAnime():
    ANIbro_data = request.get_json()
    Anime_genres = ANIbro_data.get('genres', [])

    if len(Anime_genres) == 0: 
        return jsonify({
                "status": 400,
                "message": "Didn't got the genres"
                })
        
    recommended_genre = animeRecommender(Anime_genres)

    return jsonify({
        "status": 200,
        "message": "Genre Incoming!",
        "genre": recommended_genre
    })
    
@app.post('/recommend-manga')
def recommendManga():
    ANIbro_data = request.get_json()
    Manga_genres = ANIbro_data.get('genres', [])

    if len(Manga_genres) == 0:
        return jsonify({
            "status": 400,
            "message": "Didn't got the genres"
        })

    recommended_genre = mangaRecommender(Manga_genres)

    return jsonify({
        "status": 200,
        "message": "Genre Incoming!",
        "genre": recommended_genre
    })

if __name__ == "__main__":
    debug = os.environ.get("NODE_ENV") != 'production'
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)), debug=debug)