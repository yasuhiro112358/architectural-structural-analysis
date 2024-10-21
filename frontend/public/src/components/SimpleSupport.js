import simpleSupport from "./simple-support.js";

export const SimpleSupport = () => {
  const init = () => {
    simpleSupport();
  };
  setTimeout(init, 0);

  return `
    <main>
      <div class="container pt-5">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6">

            <h1 class="text-center mb-3">Simple Support</h1>

            <img src="./assets/images/beam.png" class="img-fluid w-100 p-3 mb-3" alt="">

            <div id="result-container" class="mb-4">
              <div class="border border-2 p-3" style="height: 100px">
                <p class="fs-5 text-left">Bending Stress:</p>
                <p id="bending-stress" class="text-end fs-6 m-0"></p>
              </div>
            </div>

            <div id="formContainer" class="mb-4">
              <div class="mb-3">
                <label for="udl" class="form-label">UDL (Uniformly Distributed Load) [N]</label>
                <input type="number" class="form-control" name="udl" value="" id="udl" placeholder="" required>
              </div>

              <div class="mb-3">
                <label for="length" class="form-label">Length [m]</label>
                <input type="number" class="form-control" name="length" value="" id="length" placeholder="" required>
              </div>

              <div class="mb-3">
                <label for="section_modulus" class="form-label">Section Modulus [m^3]</label>
                <input type="number" class="form-control" name="section_modulus" value="" id="section_modulus" placeholder=""
                  required>
              </div>

              <div class="">
                <button id="calculate-btn" class="btn btn-dark w-100">
                  Calculate
                </button>
              </div>
            </div>

            <div class="mb-5">
              <a href="/" class="btn btn-outline-dark w-100" data-link>Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
};
