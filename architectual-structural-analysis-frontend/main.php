<?php
$data["udl"] = "";
$data["length"] = "";
$data["section_modulus"] = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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
    // $result = file_get_contents("http://flask-api:5000/calculate", false, $context);

    // 開発環境
    $file = file_get_contents("http://flask-api:5000/calculate", false, $context);

    // 実装環境
    // $file = file_get_contents("https://pure-journey-37437-b4f9140270ec.herokuapp.com/calculate", false, $context);

    if ($file === false) {
        /* Handle error */
        $result = "Error";
    } else {
        $result = json_decode($file, true)['bending_stress'];
        $result = number_format(round($result, 3), 1, '.', ',');
        $result = "Bending Stress: $result [Pa]";
    }
}

// Output
$page_title = "Architectural Structural Analysis";

include "./includes/header.php";
?>

<div class="container mt-5">
    <h1 class="text-center mb-3">Architectural Structural Analysis</h1>

    <div class="row justify-content-center mb-3">
        <div class="col-md-8">
            <img src="./assets/images/beam.png" class="img-fluid w-100 p-3" alt="">
        </div>
    </div>

    <?php if (isset($result)) : ?>
        <div class="mx-3 mb-4">
            <div class="border border-2 p-3">
                <h2 class="text-center">Result</h2>
                <p class="text-center fs-4 m-0"><?= $result ?></p>

            </div>
        </div>
    <?php endif; ?>

    <form action="" method="post">
        <div class="mb-3">
            <label for="udl" class="form-label">UDL (Uniformly Distributed Load) [N]</label>
            <input type="number" class="form-control" name="udl" value="<?= $data["udl"] ?>" id="udl" placeholder="<?= $data["udl"] ?>" required>
        </div>

        <div class="mb-3">
            <label for="length" class="form-label">Length [m]</label>
            <input type="number" class="form-control" name="length" value="<?= $data["length"] ?>" id="length" placeholder="<?= $data["length"] ?>" required>
        </div>

        <div class="mb-5">
            <label for="section_modulus" class="form-label">Section Modulus [m^3]</label>
            <input type="number" class="form-control" name="section_modulus" value="<?= $data["section_modulus"] ?>" id="section_modulus" placeholder="<?= $data["section_modulus"] ?>" required>
        </div>

        <div class="mb-5">
            <button type="submit" class="btn btn-dark w-100">Calculate</button>
        </div>
    </form>

</div>

<?php
include "./includes/footer.php";
?>