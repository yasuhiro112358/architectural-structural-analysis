// function setupLinks() {
//   const links = document.querySelectorAll('[data-link]');
//   console.log('links:', links);

//   links.forEach(link => {
//     link.addEventListener('click', event => {
//       event.preventDefault();

//       const url = event.target.getAttribute('href'); // クリックされたリンクのURLを取得
//       console.log('Links to', url, 'is clicked');

//       history.pushState(null, null, url); // URLを変更して履歴に追加
//       console.log('history:', history);

//       // すべてのリンクからactiveクラスを削除
//       links.forEach(link => {
//         link.classList.remove('active');
//       });
//       // クリックされたリンクにactiveクラスを追加
//       link.classList.add('active');
//     });
//   });

//   console.log('Finish setting up links');
// }

// export default setupLinks;