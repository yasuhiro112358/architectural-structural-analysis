<?php
require_once "./includes/config.php";

$page_title = "Index";

include "./includes/header.php";
?>

<div class="container mt-5">
    <h1 class="text-center mb-4">Architectural Structural Analysis</h1>

    <div class="row justify-content-center">
        <div class="col-md-6">
            <a href="main.php" class="btn btn-dark d-block mb-3">
                main.php
            </a>

            <a href="seismic-wave.php" class="btn btn-dark d-block mb-3">
                seismic-wave.php
            </a>
        </div>
    </div>


</div>



<?php
include "./includes/footer.php";
?>