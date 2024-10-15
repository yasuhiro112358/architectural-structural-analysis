import loadComponent from './loadComponent.js';
import route from './route.js';

// リンクのクリックを捕捉してルーティング処理
function setupLinks() {
  const links = document.querySelectorAll('[data-link]');
  console.log('links:', links);

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const url = event.target.getAttribute('href'); // クリックされたリンクのURLを取得
      console.log('Links to', url, 'is clicked');

      history.pushState(null, null, url); // URLを変更して履歴に追加
      console.log('history:', history);

      // すべてのリンクからactiveクラスを削除
      links.forEach(link => {
        link.classList.remove('active');
      });
      // クリックされたリンクにactiveクラスを追加
      link.classList.add('active');  

      route(); // ルーティング処理を呼び出す
    });
  });
}

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



// 初期ロード時と履歴が変わったときにルート処理を呼び出す
window.addEventListener('popstate', route); // 履歴が変わったときに発火
window.addEventListener('load', route); // ページが読み込まれたときに発火