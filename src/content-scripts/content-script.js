// content-script.js
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'c') {
      chrome.runtime.sendMessage({ type: 'ctrlC' });
    }
  });