// import { Header } from './components/Header.js';
import { router } from './services/router.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import SimpleSupport from './components/SimpleSupport.js';
import SeismicWave from './components/SeismicWave.js';

export const App = () => {
  const appElement = document.getElementById('app');
  const currentRoute = router.getCurrentRoute();

  // Render page based on route
  if (currentRoute === '/') {
    appElement.innerHTML = Home();
  } else if (currentRoute === '/about') {
    appElement.innerHTML = About();
  } else if (currentRoute === '/contact') {
    appElement.innerHTML = Contact();
  } else if (currentRoute === '/simple-support') {
    appElement.innerHTML = SimpleSupport();
  } else if (currentRoute === '/seismic-wave') {
    appElement.innerHTML = SeismicWave();
  }
};
