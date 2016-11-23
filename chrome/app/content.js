// ========================================================================
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const body1 = document.body.innerHTML;
  const title1 = document.title;
  const url1 = document.URL;
  sendResponse({ title1, body1, url1 });
});
// ========================================================================
