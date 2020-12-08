var saveActionButton = document.getElementById('saveActionId');
saveActionButton.addEventListener(
  'click',
  () => {
    getCurrentTab();
  },
  false
);
const getCurrentTab = async () => {
  if (chrome) {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (arrayOfTabs) => {
        console.log(arrayOfTabs);
      }
    );
  } else {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(logCurrentTabData);
  }
};
