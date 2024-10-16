import sys
sys.path.append('/var/www/html/arch-struct-analysis/api')

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS # CORS（Cross-Origin Resource Sharing）

from calc_module import calculate_structure

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
    # debug=True: デバッグモードを有効にする
    # host='0.0.0.0': 他のデバイスからアクセス可能にする
    # port=5001: ポート番号を5001に設定する
    
