// // ========================================================================
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const body = document.body.innerHTML;
//   const title = document.title;
//   sendResponse({ title, body });
// });
// // ========================================================================

// chrome.extension.sendMessage({ method: 'getStatus' }, (response) => {
//   const url = window.location.href;
//   const title = document.title;
//   const userId = response.userId;
//   const body = document.body.innerHTML;
//   console.log(body);
//   const data = {
//     url,
//     title,
//     userId,
//   };

//   const request = new XMLHttpRequest();
//   request.open('POST', 'https://dejavu.ninja/api/chrome', true);
//   // request.open('POST', 'http://localhost:3000/api/chrome', true);
//   request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//   request.send(JSON.stringify(data));
// });
