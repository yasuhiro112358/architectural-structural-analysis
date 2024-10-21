import Layout from './Layout.js';

export default function Home() {
  const init = () => {};
  setTimeout(init, 0);

  return `
    ${Layout(`
      <div class="container pt-5">  
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6">
            <h1 class="text-center mb-4">Architectural Structural Analysis</h1>
            
            <a href="/simple-support" class="btn btn-dark d-block mb-3" data-link>
              Simple Support
            </a>

            <a href="/seismic-wave" class="btn btn-dark d-block mb-3" data-link>
              Seismic Wave
            </a>
          </div>
        </div>
      </div>
    `)}
  `;
}
