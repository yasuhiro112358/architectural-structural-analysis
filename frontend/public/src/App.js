import { router } from './services/router.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import SimpleSupport from './components/SimpleSupport.js';
import SeismicWave from './components/SeismicWave.js';

const routes = {
  '/': Home,
  '/about': About,
  '/contact': Contact,
  '/simple-support': SimpleSupport,
  '/seismic-wave': SeismicWave,
};

export default function App() {
  const appElement = document.getElementById('app');
  const currentRoute = router.getCurrentRoute();
  const Component = routes[currentRoute] || Home; // Default to Home if route not found

  appElement.innerHTML = Component();
}
