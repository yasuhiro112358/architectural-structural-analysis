import Layout from './Layout.js';
import Button from './Button.js';

export default function Home() {
  const init = () => {};
  setTimeout(init, 0);

  return `
    ${Layout(`
      <div class="pt-5">  
        <h1 class="text-center mb-4">Architectural Structural Analysis</h1>
        <div class="d-flex flex-column align-items-center">
          <div class="mb-3">
            ${Button({ href: '/simple-support', text: 'Simple Support' })}
          </div>
          <div class="mb-3">
            ${Button({ href: '/seismic-wave', text: 'Seismic Wave' })}
          </div>
        </div>  
      </div>
    `)}
  `;
}
