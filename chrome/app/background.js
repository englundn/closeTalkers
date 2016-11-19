let time = null;
let url = '';

const reset = () => {
  time = null;
  url = '';
};

const start = (link) => {
  url = link;
  time = new Date().getTime();
};

const send = (timeInfo) => {
  const request = new XMLHttpRequest();
  const userId = localStorage.userId;
  const data = { userId, url, timeInfo };
  request.open('POST', 'https://dejavu.ninja/api/chrome', true);
  // request.open('POST', 'http://localhost:3000/api/chrome', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(data));
};

const sendLast = () => {
  if (url && time) {
    const newTime = new Date().getTime();
    const timeInfo = [time, newTime, newTime - time];
    send(timeInfo);
  }
  reset();
};

const checkActive = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    if (!tab[0] || !tab[0].url || tab[0].url === url) { return; }
    sendLast();
    start(tab[0].url);
  });
};

// ======================STORE USER ID====================================
chrome.identity.getProfileUserInfo((userInfo) => {
  if (userInfo) {
    localStorage.userId = userInfo.id;
  } else {
    console.error('Could not get user ID');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'getStatus') {
    sendResponse({ userId: localStorage.userId });
  } else {
    sendResponse({});
  }
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://dejavu.ninja' });
});
// ======================LISTEN FOR VIEW CHANGE===========================
chrome.tabs.onUpdated.addListener(checkActive);
chrome.tabs.onActivated.addListener(checkActive);

chrome.windows.onFocusChanged.addListener((window) => {
  window === chrome.windows.WINDOW_ID_NONE ? sendLast() : checkActive();
});

chrome.idle.setDetectionInterval(30);
chrome.idle.onStateChanged.addListener(() => {
  chrome.idle.queryState(30, (state) => {
    if (state === 'active') {
      checkActive();
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        tab[0].audible === false ? sendLast() : null;
      });
    }
  });
});
