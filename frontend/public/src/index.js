import App from './App.js';
import { router } from './services/router.js';

// Initial render
App();

// Set up routing
window.addEventListener('popstate', () => {
  App();
});

document.body.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    const target = e.target;
    const href = target.getAttribute('href');
    const isExternal = target.hostname !== window.location.hostname;

    if (isExternal) {
      return; // 外部リンクの場合はデフォルトの動作を許可
    }

    e.preventDefault();
    router.navigateTo(href);
    App();
  }
});
