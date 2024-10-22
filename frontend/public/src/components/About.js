import Layout from './Layout.js';

export default function About() {
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
  setTimeout(init, 0);

  return `
    ${Layout(`
      <div>
        <h1>About Page</h1>
        <p>This is the about page.</p>
      </div>
    `)}
  `;
}
