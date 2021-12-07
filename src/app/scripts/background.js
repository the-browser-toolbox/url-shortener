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
  
chrome.contextMenus.create({
    title: "Shorten Url",
    contexts: ["all"],
    onclick: function (info, tab) {
        getCurrentTab()
    }
  });