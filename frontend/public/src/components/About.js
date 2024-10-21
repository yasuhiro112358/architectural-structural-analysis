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
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Submit</button>
      </form>
    `)}
  `;
}
