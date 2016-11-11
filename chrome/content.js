const url = window.location.href;
const title = document.title;

const data = {
  url,
  title,
};

const request = new XMLHttpRequest();
request.open('POST', 'http://localhost:3000/api/chrome', true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.send(JSON.stringify(data));
