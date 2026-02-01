from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

from AnimeRecommender import animeRecommender
from MangaRecommender import mangaRecommender


app = Flask(__name__)
CORS(app)

@app.errorhandler(Exception)
def AIError(e):
    print('\033[91merror: \033[0m', e)
    return jsonify({
        "message": "their is an error in AI recommender"
    }), 500

@app.get('/')
def Running():
    return {
        "message": "Server Running"
    }, 200

@app.post('/recommend-anime')
def recommendAnime():
    ANIbro_data = request.get_json(silent=True)

    if not ANIbro_data:
        return jsonify({
            'message': 'didn\'t got the genre'
        }), 400

    Anime_genres = ANIbro_data.get('genres', [])

    if len(Anime_genres) == 0: 
        return jsonify({
                "message": "Didn't got the genres"
                }), 400
        
    recommended_genre = animeRecommender(Anime_genres)

    return jsonify({
        "message": "Genre Incoming!",
        "genre": recommended_genre
    }), 200
    
@app.post('/recommend-manga')
def recommendManga():
    ANIbro_data = request.get_json(silent=True)

    if not ANIbro_data:
        return jsonify({
            'message': 'didn\'t got the genre'
        }), 400

    Manga_genres = ANIbro_data.get('genres', [])

    if len(Manga_genres) == 0:
        return jsonify({
            "message": "Didn't got the genres"
        }), 400

    recommended_genre = mangaRecommender(Manga_genres)

    return jsonify({
        "status": 200,
        "message": "Genre Incoming!",
        "genre": recommended_genre
    }), 200

if __name__ == "__main__":
    debug = os.environ.get("NODE_ENV") != 'production'
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)), debug=debug)