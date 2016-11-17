let URL = '';

// ==========CHANGE THIS LATER FOR HTTP REQUEST===========
const print = (url, reason) => {
  console.log(reason, url, new Date());
};

// ======================CHANGE FOCUS========================
chrome.windows.onFocusChanged.addListener((window) => {
  if (window === chrome.windows.WINDOW_ID_NONE) {
    print('', 'STOP ');
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      URL = tab[0].url;
      print(URL, 'FOCUS ');
    });
  }
});

// ======================UPDATE TAB===========================
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (tab.url === URL) { return; }
  URL = tab.url;
  print(URL, 'UPDATE');
});

// ======================CHANGE TAB=============================
chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    URL = tab[0].url;
    print(URL, 'TAB ');
  });
});

// ======================CREATE TAB==============================
chrome.tabs.onCreated.addListener((tabId, info, tab) => {
  if (!tab.url) { return; }
  URL = tab.url;
  print(URL, 'CREATE');
});

// ======================STATE CHANGE=========================
chrome.idle.onStateChanged.addListener(() => {
  console.log('state changed');
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
