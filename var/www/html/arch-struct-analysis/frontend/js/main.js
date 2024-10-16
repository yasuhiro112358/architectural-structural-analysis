import loadComponent from './loadComponent.js';
import route from './route.js';
// import setupLinks from './setupLinks.js';

async function initPage() {
  // 必要なJavaScriptの初期化処理をここに書く
  const host = window.location.origin;
  const headerUrl = `${host}/components/header.html`;
  const footerUrl = `${host}/components/footer.html`;
  await loadComponent(headerUrl, 'header');
  await loadComponent(footerUrl, 'footer');

  const page = route();
  await loadComponent(page, 'content');

  const links = document.querySelectorAll('[data-link]');
  console.log('links:', links);
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const url = event.target.getAttribute('href'); // クリックされたリンクのURLを取得
      const state = { url: url }; // 履歴に追加するデータ
      history.pushState(state, '', url); // URLを変更して履歴に追加
      console.log('history:', history);

      // すべてのリンクからactiveクラスを削除
      links.forEach(link => {
        link.classList.remove('active');
      });
      // クリックされたリンクにactiveクラスを追加
      link.classList.add('active');

      initPage(); // URL変更後にJSを実行
    });
  });
  console.log('Page initialized');
}

// ルーターが動くたびに initPage を実行する
window.addEventListener('popstate', function () {
  initPage(); // URL変更後にJSを実行
});

// 初期化時に一度呼び出す
initPage();
console.log('main.js loaded');