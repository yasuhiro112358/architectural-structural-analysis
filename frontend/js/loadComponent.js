async function loadComponent(url, elementId) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data; // ページを表示
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('Finish loading component', elementId, 'from', url);
}

export default loadComponent;
