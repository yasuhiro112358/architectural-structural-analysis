import Header from './Header.js';
import Footer from './Footer.js';
import Container from './Container.js';

export default function Layout(children) {
  return `
    <div class="d-flex flex-column min-vh-100">
      <header class="fixed-top">
        ${Header()}
      </header>
      <main class="flex-grow-1" style="padding-top: 56px;">
        ${Container(children)}
      </main>
      <footer style="height: 36px;">
        ${Footer()}
      </footer>
    </div>
  `;
}

