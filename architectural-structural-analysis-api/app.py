import os # Herokuの環境変数を読み込むため
from flask import Flask, request, jsonify # FlaskフレームワークからFlaskクラス、requestオブジェクト、jsonify関数をインポート
from flask_cors import CORS # CORS（Cross-Origin Resource Sharing）

# Original functions
from calc_module import calculate_structure 

app = Flask(__name__) # Flaskアプリケーションの初期化（インスタンスの作成）

CORS(app) # CORSをアプリに適用

# ルートとビュー関数の定義
@app.route('/')
def home():
    return 'This is Web API for calculation of architectural structure.'

@app.route('/calculate', methods=['POST'])
def calculate():
    # リクエストのボディからJSONデータを取得
    data = request.get_json()
    udl = float(data['udl'])
    length = float(data['length'])
    section_modulus = float(data['section_modulus'])
    
    result = calculate_structure(udl, length, section_modulus)

    # 計算結果をJSON形式でクライアントに返す
    return jsonify({"bending_stress": result})

# アプリケーションの実行部分
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Herokuの環境変数からポート番号を取得、設定されていなければ5000をデフォルト値とする
    app.run(debug=True, host='0.0.0.0', port=port)
    # debug=True: デバッグ情報の提供
    # host='0.0.0.0': すべてのネットワークインターフェースでアプリケーションを利用可能にし、外部からのアクセスを許可
    # port=5000: アプリケーションがリッスンするポート番号
