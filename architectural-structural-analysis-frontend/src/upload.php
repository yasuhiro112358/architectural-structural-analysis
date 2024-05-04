<?php
require_once(__DIR__ . "/../includes/config.php");

echo "Here is upload.php";


if ($_FILES['file']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['file']['tmp_name'])) {
    

    $curl = curl_init();

    $file = new CURLFile($_FILES['file']['tmp_name'], $_FILES['file']['type'], $_FILES['file']['name']);

    $data = array("file" => $file);

    // curl_setopt($curl, CURLOPT_URL, "http://localhost:5000/upload");
    curl_setopt($curl, CURLOPT_URL, API_URL . "/upload");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);

    curl_close($curl);

    echo $response; // JSON or link to download the processed CSV
}
