<?php
require_once "./includes/config.php";
$page_title = "Seismic Wave Input";



include "./includes/header.php";
?>

<div class="container mt-5 mb-4">
    <h1 class="text-center mb-3">Seismic Wave</h1>
</div>

<form action="./src/upload.php" method="post" enctype="multipart/form-data">
    <div class="container mb-4">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="file" class="form-label">Upload a CSV file downloaded from <a href="https://www.data.jma.go.jp/eqev/data/kyoshin/jishin/index.html" target="_blank">Japan Meteorological Agency</a> to see its wave:</label>
                    <input type="file" class="form-control" name="file" value="" id="file" placeholder="" required>
                </div>

                <div class="mb-5">
                    <button type="submit" class="btn btn-dark w-100">Upload</button>
                </div>


                <div class="mb-3">
                    <h2 class="text-center mb-3">
                        History of Seismic Acceleration
                    </h2>

                    <div class="mb-3">
                        <canvas id="ns-acc-chart">
                            Canvas not supported...
                        </canvas>
                        <p class="text-center">
                            Fig.1 NS-direction
                        </p>
                    </div>

                    <div class="mb-3">
                        <canvas id="ew-acc-chart">
                            Canvas not supported...
                        </canvas>
                        <p class="text-center">
                            Fig.2 EW-direction
                        </p>
                    </div>

                    <div class="mb-3">
                        <canvas id="ud-acc-chart">
                            Canvas not supported...
                        </canvas>
                        <p class="text-center">
                            Fig.3 UD-direction
                        </p>
                    </div>

                    
                </div>


                <div class="mb-5">
                    <a href="./index.php" class="btn btn-outline-dark w-100">Back to Home</a>
                </div>
            </div>
        </div>
    </div>
</form>



<?php
include "./includes/footer.php";
?>