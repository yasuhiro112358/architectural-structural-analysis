import { Header } from './Header.js';
import { Footer } from './Footer.js';

export const Home = () => {
  // Render the HTML structure with nested components
  const render = () => `
    ${Header()}
    <main>
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
    </main>
    ${Footer()}
  `;

  // Define any logic to run after the component has been rendered
  const init = () => {
    const button = document.getElementById('click-me-btn');
    if (button) {
      button.addEventListener('click', () => {
        alert('Button clicked!');
      });
    }
  };

  // Return the render method (like returning JSX in React)
  setTimeout(init, 0); // Mimic componentDidMount or useEffect
  return render();
};
