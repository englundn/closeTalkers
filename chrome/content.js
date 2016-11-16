chrome.extension.sendMessage({ method: 'getStatus' }, (response) => {
  const url = window.location.href;
  const title = document.title;
  const userId = response.userId;
  const data = {
    url,
    title,
    userId,
  };

  const request = new XMLHttpRequest();
  request.open('POST', 'http://deja-vu.herokuapp.com/api/chrome', true);
  // request.open('POST', 'http://localhost:3000/api/chrome', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(data));
});
