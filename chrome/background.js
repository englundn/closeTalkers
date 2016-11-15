chrome.identity.getProfileUserInfo((userInfo) => {
  if (userInfo) {
    console.log(userInfo.id);
    localStorage.userId = userInfo.id;
  } else {
    console.error('Could not get user ID');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'getStatus') {
    sendResponse({ userId: localStorage.userId });
  } else {
    sendResponse({}); // snub them.
  }
});
