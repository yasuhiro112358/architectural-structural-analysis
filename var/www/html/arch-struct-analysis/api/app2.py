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
# @app.route('/')
@app.route('/api/home', methods=['GET'])
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

# for a simple csv
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


# for 気象庁's csv
@app.route('/seismic-wave', methods=['POST'])
def upload_file2():
    # ファイルを受け取る
    file = request.files['file']
    if not file:
        return "Error: No file"

    # CSVを読み込む
    # df = pd.read_csv(file) # df: Data Frame; pandasの機能 
    # df = pd.read_csv(file, header=6, skipinitialspace=True, dtype={'NS': float, 'EW': float, 'UD': float}) # skip 6 rows 
    df = pd.read_csv(file, header=6, skipinitialspace=True, encoding='shift_jis', dtype={'NS': float, 'EW': float, 'UD': float}) # skip 6 rows 
    
    sampling_rate = 100 # サンプリング周波数。外部から受け取るように変更
    sampling_interval = round(1 / sampling_rate, 3)

    time_data = []  # 空のリストを初期化
    for i in range(len(df)):
        time = round((i + 1) * sampling_interval, 3)
        time_data.append(time)

    df['time'] = time_data 

    # df['processed_acceleration'] = df['NS'] * 2  # 仮の処理
    # df['processed_acceleration'] = df['EW'] * 2  # 仮の処理
    # df['processed_acceleration'] = df['UD'] * 2  # 仮の処理
    # max_value = df['column_name'].max()
    # min_value = df['column_name'].min()
    # absolute_column_values = df['column_name'].abs()

    # order rows
    # df = df[['time'] + [col for col in df.columns if col != 'time']]
    df = df[['time', 'NS', 'EW', 'UD']]


    # 結果をCSVとして送る
    # output = io.StringIO()
    output = io.BytesIO()
    df.to_csv(output, index=False, encoding='utf-8')
    output.seek(0) # 操作中の行を先頭行に移動

    return send_file(
        output, 
        mimetype='text/csv', 
        as_attachment=True,
        download_name='processed.csv' # Flask 2.0以降 
    )


# ==== appの実行 ====
if __name__ == '__main__': # このスクリプトが直接実行されたときのみ有効
    # port = int(os.environ.get('PORT', 5000))  # Herokuの環境変数からポート番号を取得、設定されていなければ5000をデフォルト値とする
    # port = int(os.environ.get('PORT', 5001))  # Herokuの環境変数からポート番号を取得、設定されていなければ5000をデフォルト値とする
    # app.run(debug=True, host='0.0.0.0', port=port)
    app.run(debug=True, host='0.0.0.0', port=5001)
    # debug=True: デバッグ情報の提供
    # host='0.0.0.0': すべてのネットワークインターフェースでアプリケーションを利用可能にし、外部からのアクセスを許可
    # port=5000: アプリケーションがリッスンするポート番号
