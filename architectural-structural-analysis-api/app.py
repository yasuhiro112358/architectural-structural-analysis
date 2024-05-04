import os # Herokuの環境変数を読み込むため

# from flask import Flask, request, jsonify
# FlaskフレームワークからFlaskクラス、requestオブジェクト、jsonify関数をインポート
from flask import Flask, request, jsonify, send_file
# 追加でsend_fileをimport

from flask_cors import CORS # CORS（Cross-Origin Resource Sharing）

# pandasをインポート。インストールが必要になりそう
import pandas as pd

# io
import io

# Original functions
from calc_module import calculate_structure 

# ==========================

app = Flask(__name__) # Flaskアプリケーションの初期化（インスタンスの作成）

CORS(app) # CORSをアプリに適用

# ==== ルートとビュー関数の定義 ====
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

@app.route('/upload', methods=['POST'])
def upload_file():
    # ファイルを受け取る
    file = request.files['file']
    if not file:
        return "Error: No file"

    # CSVを読み込む
    df = pd.read_csv(file) # df: Data Frame; pandasの機能 
    # ここで何か処理を行う（例: 加速度データに何か計算を適用する）
    df['processed_acceleration'] = df['acceleration'] * 2  # 仮の処理

    # 結果をCSVとして送る
    # output = io.StringIO()
    output = io.BytesIO()
    df.to_csv(output, index=False)
    output.seek(0)

    # return send_file(output, mimetype='text/csv', attachment_filename='processed.csv', as_attachment=True)
    return send_file(
        output, 
        mimetype='text/csv', 
        as_attachment=True,
        download_name='processed.csv' # Flask 2.0以降 
    )



# ==== appの実行 ====
if __name__ == '__main__': # このスクリプトが直接実行されたときのみ有効
    port = int(os.environ.get('PORT', 5000))  # Herokuの環境変数からポート番号を取得、設定されていなければ5000をデフォルト値とする
    app.run(debug=True, host='0.0.0.0', port=port)
    # debug=True: デバッグ情報の提供
    # host='0.0.0.0': すべてのネットワークインターフェースでアプリケーションを利用可能にし、外部からのアクセスを許可
    # port=5000: アプリケーションがリッスンするポート番号
