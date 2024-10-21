import { Header } from './Header.js';
import { Footer } from './Footer.js';

export const About = () => {
  // Render the HTML structure with nested components
  const render = () => `
    ${Header()}
    <main>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    </main>
    ${Footer()}
  `;

  // Define any logic to run after the component has been rendered
  const init = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Form submitted with name: ${name}`);
      });
    }
  };

  // Return the render method (like returning JSX in React)
  setTimeout(init, 0); // Mimic componentDidMount or useEffect
  return render();
};
