<?php
// function getBendingStress($udl, $length, $section_modulus)
// {
//     $data = array(
//         "udl" => $udl,
//         "length" => $length,
//         "section_modulus" => $section_modulus
//     );

//     var_dump($data);
//     echo "<br>";

//     // HTTPリクエストの設定
//     $options = array(
//         'http' => array(
//             'header'  => "Content-type: application/json", // 送信するコンテンツがJSON形式であることを明示
//             'method'  => 'POST',
//             'content' => json_encode($data) // JSON形式にエンコードしたデータを指定
//         )
//     );

//     $context  = stream_context_create($options); // コンテキストの作成

//     echo API_URL . "/api/calculate";
//     echo "<br>";
    
//     var_dump($context);
//     echo "<br>";

//     // $file = file_get_contents(API_URL . "/calculate", false, $context); // APIにHTTPリクエスト
//     $file = file_get_contents(API_URL . "/api/calculate", false, $context); // APIにHTTPリクエスト

//     var_dump($file);
//     echo "<br>";

//     if ($file === false) { // Handle error
//         $result = "Error: API connection failed";
//     } else {
//         $result = json_decode($file, true)['bending_stress'];
//         $result = number_format(round($result, 3), 1, '.', ',');
//         $result = "Bending Stress: $result [Pa]";
//     }

//     return $result;
// }
