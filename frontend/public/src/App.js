import { Header } from './components/Header.js';
import { Home } from './components/Home.js';
import { About } from './components/About.js';
import { router } from './services/router.js';

export const App = () => {
  const appElement = document.getElementById('app');
  const currentRoute = router.getCurrentRoute();

  // Render the header
  appElement.innerHTML = Header();

  // Render page based on route
  if (currentRoute === '/') {
    appElement.innerHTML += Home();
  } else if (currentRoute === '/about') {
    appElement.innerHTML += About();
  }
};
