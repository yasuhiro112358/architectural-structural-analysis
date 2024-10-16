import { Header } from './Header.js';
import { Footer } from './Footer.js';

export const Home = () => {
  // Render the HTML structure with nested components
  const render = () => `
    ${Header()}
    <main>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button id="click-me-btn">Click Me</button>
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
