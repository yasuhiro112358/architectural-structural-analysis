function route() {
    const path = window.location.pathname;
    console.log('path:', path);

    const routes = {
        '/': '/pages/home.html',
        '/about': '/pages/about.html',
        '/contact': '/pages/contact.html',
        '/simple-support': '/pages/simple-support.html',
    };

    const page = routes[path] || '/pages/home.html';
    console.log('page:', page);

    return page;
}

export default route;