let url = '';
let time = null;
let title = '';
let body = '';

const reset = () => {
  url = '';
  time = null;
  title = '';
  body = '';
};

const start = (tab) => {
  chrome.tabs.sendMessage(tab.id, 'info', (res) => {
    if (!res) { return start(tab); }
    title = res.title1;
    body = res.body1;
    time = new Date().getTime();
    url = tab.url;
  });
};

const sendLast = (tab) => {
  if (url && time && title && body) {
    const newTime = new Date().getTime();
    const timeInfo = [time, newTime, newTime - time];
    const request = new XMLHttpRequest();
    const userId = localStorage.userId;
    const data = { userId, url, timeInfo, title, body };
    // console.log('sending: ', title, body.length, url, timeInfo);
    request.open('POST', 'https://dejavu.ninja/api/chrome', true);
    // request.open('POST', 'http://localhost:3000/api/chrome', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
  }
  return tab ? start(tab) : reset();
};

const checkActive = (id, info) => {
  if (info && info.status === 'loading') { return; }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || !tabs[0].url || tabs[0].url === url) { return; }
    sendLast(tabs[0]);
  });
};

// ======================LISTEN FOR VIEW CHANGE===========================
chrome.tabs.onUpdated.addListener(checkActive);
chrome.tabs.onActivated.addListener(checkActive);

chrome.windows.onFocusChanged.addListener((window) => {
  window === chrome.windows.WINDOW_ID_NONE ? sendLast() : checkActive();
});

chrome.idle.onStateChanged.addListener(() => {
  chrome.idle.queryState(30, (state) => {
    if (state === 'active') { return checkActive(); }
    chrome.tabs.query({ active: true, currentWindow: true },
      tab => tab[0].audible === true ? null : sendLast()
    );
  });
});

// ============================STORE USER ID==============================
chrome.identity.getProfileUserInfo((userInfo) => {
  if (userInfo) {
    localStorage.userId = userInfo.id;
  } else {
    console.error('Could not get user ID');
  }
});

// ========================================
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://dejavu.ninja' });
});
