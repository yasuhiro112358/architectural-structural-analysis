<?php
require_once "./includes/config.php";
$page_title = "Seismic Wave Input";





include "./includes/header.php";
?>

<div class="container mt-5 mb-4">
    <h1 class="text-center mb-3">Seismic Wave Input</h1>
</div>

<form action="" method="post" enctype="multipart/form-data">
    <div class="container mb-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="file" class="form-label">Upload a CSV file:</label>
                    <input type="file" class="form-control" name="file" value="" id="file" placeholder="" required>
                </div>
        
                <div class="mb-3">
                    <button type="submit" class="btn btn-dark w-100">Save</button>
                </div>
            </div>
        </div>
    </div>
</form>





</div>

<?php
include "./includes/footer.php";
?>