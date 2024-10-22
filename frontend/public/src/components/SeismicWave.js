import Layout from "./Layout.js";
import renderGraph from "../services/renderGraph.js";

export default function SeismicWave() {
  const init = () => {
    renderGraph();
  };
  setTimeout(init, 0);

  return `
    ${Layout(`
      <div class="pt-5">
        <h1 class="text-center mb-3">Seismic Wave</h1>
        
        <form action="./src/upload.php" method="post" enctype="multipart/form-data">
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
              <a href="/" class="btn btn-outline-dark w-100">
                Back to Home
              </a>
          </div>

        </form>
      </div>

      
    `)}
  `;
}
