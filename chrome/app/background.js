let url = '';
const print = reason => console.log(reason, url, new Date());
const stop = () => url === '' ? null : print('STOP ', url = '');

const checkActive = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    if (!tab[0].url || tab[0].url === url) { return; }
    print('CHANGED ', url = tab[0].url);
  });
};

chrome.idle.setDetectionInterval(20);

chrome.tabs.onUpdated.addListener(checkActive);
chrome.tabs.onActivated.addListener(checkActive);

chrome.windows.onFocusChanged.addListener((window) => {
  window === chrome.windows.WINDOW_ID_NONE ? stop() : checkActive();
});

chrome.idle.onStateChanged.addListener(() => {
  chrome.idle.queryState(20, (state) => {
    state === 'idle' || state === 'locked' ? stop() : checkActive();
  });
});

// ======================STORE USER ID========================
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
  chrome.tabs.create({ url: 'https://deja-vu.herokuapp.com' });
});
