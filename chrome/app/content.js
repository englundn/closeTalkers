// ========================================================================
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const body1 = document.body.innerHTML;
  const title1 = document.title;
  sendResponse({ title1, body1 });
});
// ========================================================================
