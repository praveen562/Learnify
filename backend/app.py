from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

@app.route('/')
def serve_home():
    response = send_from_directory(app.static_folder, "index.html")
    response.cache_control.no_cache = True
    return send_from_directory(app.static_folder, "index.html")

@app.route('/process_voice', methods=['POST'])
def process_voice():
    data = request.json
    transcript = data.get('transcript', '')
    return jsonify({'message': f'Received: {transcript}'})

# Optional: Serve static assets (CSS, JS)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=5000)
