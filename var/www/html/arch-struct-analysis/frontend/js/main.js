import loadComponent from './loadComponent.js';
import route from './route.js';
import setupLinks from './setupLinks.js';

// ヘッダーとフッターを読み込み
window.onload = async () => {
  const host = window.location.origin;
  // const host = "";
  console.log('host:', host);

  const headerUrl = `${host}/components/header.html`;
  console.log('headerUrl:', headerUrl);
  await loadComponent(headerUrl, 'header');

  const footerUrl = `${host}/components/footer.html`;
  console.log('footerUrl:', footerUrl);
  await loadComponent(footerUrl, 'footer');

  console.log('Finish loading header and footer');

  setupLinks();
  console.log('Finish setting up links');
};



window.addEventListener('popstate', () => { // 履歴が変わったときに発火
  setupLinks();
  const page = route();
  loadComponent(page, 'content');
});

window.addEventListener('load', () => {  // ページが読み込まれたときに発火
  const page = route();
  loadComponent(page, 'content');
});