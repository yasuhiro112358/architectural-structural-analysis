import Layout from "./Layout.js";
import renderGraph from "../services/renderGraph.js";

export default function SeismicWave() {
  const uploadedFiles = [];

  const renderUploadedFiles = () => {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = uploadedFiles.map(file => `<li>${file}</li>`).join('');
  };

  const fetchUploadedFiles = () => {
    fetch('/api/files')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch uploaded files');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        uploadedFiles.length = 0; // Clear the array
        console.log(data);
        uploadedFiles.push(...data); // ファイル名を取得
        renderUploadedFiles();
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'アップロードされたファイルの取得に失敗しました';
      });
  };


  const uploadFile = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      document.getElementById('message').innerText = 'ファイルを選択してください';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const apiEndpoint = '/api/upload';
    
    fetch(apiEndpoint, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('API connection failed');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('message').innerText = data.message || data.error;

        if (data.message) {
          fetchUploadedFiles();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'ファイルのアップロードに失敗しました';
      });
  };

  const init = () => {
    fetchUploadedFiles();
    renderGraph();
    document.getElementById('uploadButton').addEventListener('click', uploadFile);
  };

  setTimeout(init, 0);

  return `
    ${Layout(`
      <div class="pt-5">
        <h1 class="text-center mb-3">Seismic Wave</h1>
        
        <form id="uploadForm">
          <div class="mb-3">
              <label for="fileInput" class="form-label">
                Upload a CSV file downloaded from <a href="https://www.data.jma.go.jp/eqev/data/kyoshin/jishin/index.html" target="_blank">Japan Meteorological Agency</a> to see its wave:
              </label>
              <input type="file" id="fileInput" accept=".csv" class="form-control">
          </div>

          <div class="mb-5">
              <button type="button" id="uploadButton" class="btn btn-dark w-100">
                Upload
              </button>
              <p id="message"></p>
          </div>
        </form>

        <div class="mb-3">
            <h2 class="text-center mb-3">
                Uploaded Files
            </h2>
            <ul id="fileList"></ul>
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
      </div>
    `)}
  `;
}
