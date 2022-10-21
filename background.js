var first = true;
var running = false;

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
  } else if(running == true) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: del
    });
    running = false;
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: add
    });
    running = true;
  }
});
