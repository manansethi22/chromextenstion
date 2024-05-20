chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    const url = new URL(tab.url);
    const isShipstationDomain = url.hostname.includes('shipstation.com');
    setExtensionIcon(tabId, isShipstationDomain);
  }
});

// background.js
let ctrlCPressed = false;
// eslint-disable-next-line
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CTRL_C_PRESSED') {
    ctrlCPressed = true;
  }
});

// eslint-disable-next-line
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CTRL_C_STATUS') {
    sendResponse({ ctrlCPressed });
    // Reset the status after sending it to the popup
    ctrlCPressed = false;
  }
});


function setExtensionIcon(tabId, isShipstationDomain) {
  const iconPath = isShipstationDomain
    ? {
        "16": "src/assets/colored-icon-16.png",
        "48": "src/assets/colored-icon-48.png",
        "128": "src/assets/colored-icon-128.png"
      }
    : {
        "16": "src/assets/grey-icon-16.png",
        "48": "src/assets/grey-icon-48.png",
        "128": "src/assets/grey-icon-128.png"
      };

  chrome.browserAction.setIcon({
    path: iconPath,
    tabId: tabId
  });
}