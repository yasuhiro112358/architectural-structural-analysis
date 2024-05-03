# このAppをFlaskで起動しておく必要がある
# python3 app.py
# 

import os # Herokuの環境変数を読み込むため
# FlaskフレームワークからFlaskクラス、requestオブジェクト、jsonify関数をインポート
from flask import Flask, request, jsonify 
# CORS（Cross-Origin Resource Sharing）
from flask_cors import CORS  
# 別ファイルで作ったもの
from calc_module import calculate_structure 

# Flaskアプリケーションの初期化（インスタンスの作成）
app = Flask(__name__)
# CORSをアプリに適用
CORS(app)  

# ルートとビュー関数の定義
@app.route('/')
def home():
    return 'This is app.py for calculation of architectural structure.'

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
    # Macではport=5000をAirPlay Receiverが使用している
    # app.run(debug=True, host='0.0.0.0', port=5000)
    # app.run(debug=True, host='0.0.0.0', port=5001)
    
    # Dockerでportを5001:5000にマッピングしたため設定を5000に戻す
    # app.run(debug=True, host='0.0.0.0', port=5000)
    # debug=True: デバッグ情報の提供
    # host='0.0.0.0': すべてのネットワークインターフェースでアプリケーションを利用可能にし、外部からのアクセスを許可
    # port=5000: アプリケーションがリッスンするポート番号

    # Herokuで必要な設定（ポートをHerokuの設定に合わせる）
    port = int(os.environ.get('PORT', 5000))  # 環境変数からポート番号を取得、設定されていなければ5000をデフォルト値とする
    app.run(host='0.0.0.0', port=port)
