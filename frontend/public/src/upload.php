<?php
require_once(__DIR__ . "/../includes/config.php");

ob_start(); # header()の前にechoが実行されないようにするため

echo "Here is upload.php<br>";

if ($_FILES['file']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['file']['tmp_name'])) {

    // uploadされたファイルの保存
    $target_dir = __DIR__ . "/../uploads/";
    // 保存するファイル名（元のファイル名を使用）
    $target_file = $target_dir . basename($_FILES['file']['name']);
    // ファイルを指定したディレクトリに移動
    if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
        echo "The file " . htmlspecialchars(basename($_FILES['file']['name'])) . " has been uploaded.<br>";
    } else {
        echo "Sorry, there was an error uploading your file.<br>";
    }

    // fileのAPIへの送信
    $curl = curl_init();
    // 保存したファイルを元にAPIへの送信データを作成
    $file = new CURLFile($target_file, $_FILES['file']['type'], $_FILES['file']['name']);
    $data = array("file" => $file);

    // for test
    // curl_setopt($curl, CURLOPT_URL, API_URL . "/upload");
    // for 気象庁's data
    curl_setopt($curl, CURLOPT_URL, API_URL . "/seismic-wave");

    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, true); // header情報の取得

    $response = curl_exec($curl);

    // ヘッダとボディを分割
    $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
    $header = substr($response, 0, $header_size);
    $body = substr($response, $header_size);

    // echo $header_size . "<br>";
    // echo $header . "<br>";
    // echo $body . "<br>";

    curl_close($curl);

    // レスポンスがCSVであるかをチェック
    if (strpos($header, 'Content-Type: text/csv') !== false) {
    // if (strpos($header, 'Content-Type: text/csv') !== false or strpos($header, 'Content-Type: text/html') !== false) {
        // APIからのレスポンスをCSVファイルとして保存
        $output_file_path = $target_dir . 'output.csv';
        file_put_contents($output_file_path, $body);
        echo "The processed file has been saved to " . htmlspecialchars($output_file_path);

        header("location: ../seismic-wave.php");
        exit;
    } else {
        echo "Failed to retrieve a valid CSV file.<br>Here's the response header: " . nl2br(htmlspecialchars($header) . "<br>");
        exit;
    }    
}
