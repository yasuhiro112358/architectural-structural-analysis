import loadComponent from './loadComponent.js';

function route() {
    const path = window.location.pathname;
    console.log('path:', path);

    let page = '/pages/home.html'; // デフォルトページ
    if (path === '/about') {
        page = '/pages/about.html';
    } else if (path === '/contact') {
        page = '/pages/contact.html';
    }
    console.log('page:', page);

    loadComponent(page, 'content'); // ページを読み込んで表示
}

export default route;