var first = true;
var running = false;
var contextMenuItem = {
  "id": "Download SVG",
  "title": "Download SVG",
  "contexts": ["all"]
};
chrome.contextMenus.create(contextMenuItem);

function del() {
  console.log("del");
  document.getElementById("canva").getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("canva").style.display = "none";
}

function add() {
  console.log("add");
  document.getElementById("canva").style.display = "block";
}

chrome.action.onClicked.addListener((tab) => {
  if (first) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["cscript.js"],
      },
      () => {}
    );
    first = false;
    running = true;
    chrome.action.setIcon({path: "images/checkmark-1767564-1502468.png"}, () => { /* ... */ });
  } else if(running == true) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: del
    });
    running = false;
    chrome.action.setIcon({path: "images/Iconsmind-Outline-Hand-Touch-2.png"}, () => { /* ... */ });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: add
    });
    running = true;
    chrome.action.setIcon({path: "images/checkmark-1767564-1502468.png"}, () => { /* ... */ });
  }
});
