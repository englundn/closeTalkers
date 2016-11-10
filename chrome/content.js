const url = window.location.href;
const title = document.title;
const body = document.body.innerHTML;

const data = {
  url,
  title,
  body,
};

const request = new XMLHttpRequest();
request.open('POST', 'http://localhost:3000/body', true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.send(JSON.stringify(data));
