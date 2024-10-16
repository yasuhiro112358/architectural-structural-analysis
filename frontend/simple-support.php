<?php
require_once "./includes/config.php";

$page_title = "Simple Support";

include "./includes/header.php";
?>

<div class="container mt-5">
    <h1 class="text-center mb-3">Simple Support</h1>

    <div class="row justify-content-center mb-3">
        <div class="col-md-6">
            <img src="./assets/images/beam.png" class="img-fluid w-100 p-3" alt="">
        </div>
    </div>

    <div id="result-container">
        <div class="row justify-content-center mb-3" >
            <div class="col-md-6">
                <div class="border border-2 p-3" style="height: 120px">
                    <h2 class="fs-3 text-left">Bending Stress:</h2>
                    <p id="bending-stress" class="text-end fs-4 m-0"></p>
                </div>
            </div>
        </div>
    </div>

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

                <div class="mb-3">
                    <label for="section_modulus" class="form-label">Section Modulus [m^3]</label>
                    <input type="number" class="form-control" name="section_modulus" value="<?= $section_modulus ?>" id="section_modulus" placeholder="<?= $section_modulus ?>" required>
                </div>

                <div class="mb-5">
                    <button type="submit" id="calculate-btn" class="btn btn-dark w-100">Calculate</button>
                </div>

                <div class="mb-5">
                    <a href="./index.php" class="btn btn-outline-dark w-100">Back to Home</a>
                </div>
            </div>
        </div>
    </form>
</div>

<?php
include "./includes/footer.php";
?>

<script>
    'use strict';
    {
        const calculateBtn = document.getElementById('calculate-btn');
        calculateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            calculateBtn.textContent = 'Calculating...';

            fetch('<?= API_URL ?>/api/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        udl: document.getElementById('udl').value,
                        length: document.getElementById('length').value,
                        section_modulus: document.getElementById('section_modulus').value,
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('API connection failed');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    document.getElementById('bending-stress').textContent = `${data.bending_stress.toFixed(2)} [Pa]`;
                    calculateBtn.textContent = 'Calculate';
                })
                .catch(error => {
                    console.error(error);
                    calculateBtn.textContent = 'Calculate';
                });
        });
    }
</script>