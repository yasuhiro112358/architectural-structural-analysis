<?php
require_once "./includes/config.php";

$page_title = "Architectural Structural Analysis";

$udl = "";
$length = "";
$section_modulus = "";

// Calculate Bending Stress
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $udl = $_POST['udl'];
    $length = $_POST['length'];
    $section_modulus = $_POST['section_modulus'];

    $result = getBendingStress($udl, $length, $section_modulus);
}

include "./includes/header.php";
?>

<div class="container mt-5">
    <h1 class="text-center mb-3">Architectural Structural Analysis</h1>

    <div class="row justify-content-center mb-3">
        <div class="col-md-6">
            <img src="./assets/images/beam.png" class="img-fluid w-100 p-3" alt="">
        </div>
    </div>

    <?php if (isset($result)) : ?>
        <div class="row justify-content-center mb-3">
            <div class="col-md-6">
                <div class="border border-2 p-3">
                    <h2 class="text-center">Result</h2>
                    <p class="text-center fs-4 m-0"><?= $result ?></p>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <form action="" method="post">
        <div class="row justify-content-center mb-3">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="udl" class="form-label">UDL (Uniformly Distributed Load) [N]</label>
                    <input type="number" class="form-control" name="udl" value="<?= $udl ?>" id="udl" placeholder="<?= $udl ?>" required>
                </div>

                <div class="mb-3">
                    <label for="length" class="form-label">Length [m]</label>
                    <input type="number" class="form-control" name="length" value="<?= $length ?>" id="length" placeholder="<?= $length ?>" required>
                </div>

                <div class="mb-5">
                    <label for="section_modulus" class="form-label">Section Modulus [m^3]</label>
                    <input type="number" class="form-control" name="section_modulus" value="<?= $section_modulus ?>" id="section_modulus" placeholder="<?= $section_modulus ?>" required>
                </div>

                <div class="mb-5">
                    <button type="submit" class="btn btn-dark w-100">Calculate</button>
                </div>
            </div>
        </div>
    </form>
</div>

<?php
include "./includes/footer.php";
?>