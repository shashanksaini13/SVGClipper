document.addEventListener('DOMContentLoaded', () => {
  const dialogBox = document.getElementById('dialog-box');;
  const query = { active: true, currentWindow: true };

  chrome.tabs.query(query, (tabs) => {
      dialogBox.innerHTML = document.documentElement;
  });
});
/*(async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => document.documentElement,
    });
  document.body.textContent = result;
});*/