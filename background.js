var first = true;
var running = false;
var arr = [];
var contextMenuItem = {
  id: "Download SVG",
  title: "Download SVGs",
  contexts: ["all"],
};
chrome.contextMenus.create(contextMenuItem);

function blob(elemID) {
  let a = document.getElementById(elemID);
  var blob = new Blob([a.outerHTML], { type: "image/svg+xml" });
  var url = URL.createObjectURL(blob);
  return url;
}

function del() {
  document
    .getElementById("canva")
    .getContext("2d")
    .clearRect(
      0,
      0,
      document.getElementById("canva").width,
      document.getElementById("canva").height
    );
  document.getElementById("canva").style.display = "none";
  /*document.getElementById("di").innerHTML = "";
  document.getElementById("di").remove();*/
}

function add() {
  document.getElementById("canva").style.display = "block";
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.greeting);
  chrome.scripting.executeScript({
    target: { tabId: sender.tab.id },
    function: blob,
    args: [(request.greeting)], 
  },
  (injectionResults) => {
    for (const frameResult of injectionResults){
    chrome.downloads.download({
      url: frameResult.result,
    });
  }
  });
});


chrome.action.onClicked.addListener((tab) => {

  if (running == false) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["cscript.js"],
      },
      () => {}
    );
    running = true;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: add,
    });
    chrome.action.setIcon(
      { path: "images/checkmark-1767564-1502468.png" },
      () => {
        /* ... */
      }
    );
  } else if (running == true) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: del,
    });
    running = false;
    chrome.action.setIcon(
      { path: "images/Iconsmind-Outline-Hand-Touch-2.png" },
      () => {
        /* ... */
      }
    );
  }
});
