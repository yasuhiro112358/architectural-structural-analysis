import sys
sys.path.append('/var/www/html/arch-struct-analysis/api')
import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # CORS（Cross-Origin Resource Sharing）
from calc_module import calculate_structure

app = Flask(__name__)
CORS(app)

relative_upload_folder = 'uploads'
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), relative_upload_folder)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# アップロードディレクトリが存在しない場合は作成
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/home', methods=['GET'])
def home():
    return 'This is Web API for calculation of architectural structure.'

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from Flask API in Docker!'})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    # リクエストのボディからJSONデータを取得
    data = request.get_json()
    udl = float(data['udl'])
    length = float(data['length'])
    section_modulus = float(data['section_modulus'])
    
    result = calculate_structure(udl, length, section_modulus)

    # 計算結果をJSON形式でクライアントに返す
    return jsonify({"bending_stress": result})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    # return jsonify({'message': 'test message'}), 200

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    # ファイル名が空でないかチェック
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # CSVファイルのみを許可
    if file and file.filename.endswith('.csv'):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully'}), 200
    else:
        return jsonify({'error': 'Invalid file type. Only CSV files are allowed.'}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
    # debug=True: デバッグモードを有効にする
    # host='0.0.0.0': 他のデバイスからアクセス可能にする
    # port=5001: ポート番号を5001に設定する
