async function loadComponent(url, elementId) {
  console.log('url:', url);
  console.log('elementId:', elementId);

  try {
    const response = await fetch(url);
    const data = await response.text();
    document.getElementById(elementId).innerHTML = data; // ページを表示
  } catch (error) {
    console.error('Error:', error);
  }
}

export default loadComponent;
