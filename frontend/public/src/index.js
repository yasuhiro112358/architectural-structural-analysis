import { App } from './App.js';
import { router } from './services/router.js';

// Initial render
App();

// Set up routing
window.addEventListener('popstate', () => {
  App();
});

document.body.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    e.preventDefault();
    
    const path = e.target.getAttribute('href');
    router.navigateTo(path);
    App();
  }
});
