import chardet

# file_path = './architectural-structural-analysis-frontend/uploads/acc20240101000147274.csv' 
# file_path = './architectural-structural-analysis-frontend/uploads/acc20240101000147600.csv' 
file_path = './architectural-structural-analysis-frontend/uploads/acc20240101000165034.csv' 


# ファイルをバイナリモードで読み込む
with open(file_path, 'rb') as file:
    content = file.read()

# 文字コードの推定
encoding = chardet.detect(content)
print(encoding)