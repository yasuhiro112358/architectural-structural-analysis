<?php
// Input
$data = array(
    "udl" => $_POST['udl'],
    "length" => $_POST['length'],
    "section_modulus" => $_POST['section_modulus']
);

// HTTPリクエストの設定
$options = array(
    'http' => array(
        // 送信するコンテンツがJSON形式であることを明示
        'header'  => "Content-type: application/json",
        'method'  => 'POST',
        // JSON形式にエンコードしたデータを指定
        'content' => json_encode($data)
    )
);

// コンテキストの作成とAPIへのリクエスト
$context  = stream_context_create($options);
// APIにHTTPリクエストを送信（第１引数はAPIのURL）
// $result = file_get_contents("http://localhost:5000/calculate", false, $context);
// $result = file_get_contents("http://localhost:5001/calculate", false, $context);
// Docker内のflask-apiをホストとする
$result = file_get_contents("http://flask-api:5000/calculate", false, $context);
if ($result === FALSE) {
    /* Handle error */
    echo "<h2>Error</h2>";
}

// Output
echo "<h1>Result</h1>";
echo "<p>Bending Stress: " . json_decode($result, true)['bending_stress'] . " Pa</p>";
