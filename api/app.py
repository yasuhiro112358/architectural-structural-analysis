from flask import Flask, jsonify
from flask_cors import CORS # CORS（Cross-Origin Resource Sharing）

app = Flask(__name__)
CORS(app)

@app.route('/api/message', methods=['GET'])
def get_message():
    return jsonify({'message': 'Hello from Flask API in Docker!'})

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    app.run(debug=True, host='0.0.0.0', port=5001)
    # debug=True: デバッグモードを有効にする
    # host='0.0.0.0': 他のデバイスからアクセス可能にする
    # port=5000: ポート番号を5000に設定する
    
