import Layout from "./Layout.js";
import simpleSupport from "../services/simpleSupport.js";

export default function SimpleSupport() {
  const init = () => {
    simpleSupport();
  };
  setTimeout(init, 0);

  return `
    ${Layout(`
      <div class="pt-5">

            <h1 class="text-center mb-3">Simple Support</h1>

            <div class="d-flex justify-content-center mb-3">
              <img src="./assets/images/beam.png" alt="" class="d-block text-center w-100" style="max-width: 300px">
            </div>

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
    `)}
  `;
}
