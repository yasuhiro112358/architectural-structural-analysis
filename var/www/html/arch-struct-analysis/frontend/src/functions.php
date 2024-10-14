<?php
function getBendingStress($udl, $length, $section_modulus)
{
    $data = array(
        "udl" => $udl,
        "length" => $length,
        "section_modulus" => $section_modulus
    );

    // HTTPリクエストの設定
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json", // 送信するコンテンツがJSON形式であることを明示
            'method'  => 'POST',
            'content' => json_encode($data) // JSON形式にエンコードしたデータを指定
        )
    );

    $context  = stream_context_create($options); // コンテキストの作成

    $file = file_get_contents(API_URL . "/calculate", false, $context); // APIにHTTPリクエスト

    if ($file === false) { // Handle error
        $result = "Error";
    } else {
        $result = json_decode($file, true)['bending_stress'];
        $result = number_format(round($result, 3), 1, '.', ',');
        $result = "Bending Stress: $result [Pa]";
    }

    return $result;
}
