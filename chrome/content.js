const url = window.location.href;
const title = document.title;

const data = {
  url,
  title,
};

const request = new XMLHttpRequest();
request.open('POST', 'https://deja-vu.herokuapp.com/api/chrome', true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.send(JSON.stringify(data));
