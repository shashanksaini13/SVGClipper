var first = true;
var running = false;
var arr = [];

function blob(elemID) {
  try{
  let a = document.getElementById(elemID);
  if (a == null) {
    document.querySelectorAll('iframe').forEach((iframe)=> {
      if(a == null) {
        a = iframe.contentWindow.document.getElementById(elemID);
      }
    });
  }
  var blob = new Blob([a.outerHTML], { type: "image/svg+xml" });
  var url = URL.createObjectURL(blob);
  return url;
  }
  catch(err){
    createPopup("Cannot download from cross origin iFrame!");
  }
}

function createPopup(message) {
  // Create a div element to hold the popup content
  const popupDiv = document.createElement('div');
  popupDiv.style.position = 'fixed';
  popupDiv.style.top = '50%';
  popupDiv.style.left = '50%';
  popupDiv.style.transform = 'translate(-50%, -50%)';
  popupDiv.style.background = 'red';
  popupDiv.style.padding = '30px';
  popupDiv.style.borderRadius = '10px';
  popupDiv.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  popupDiv.style.zIndex = '9999';
  popupDiv.style.fontFamily = 'Roboto, sans-serif';

  // Create a paragraph element for the popup message
  const popupMessage = document.createElement('p');
  popupMessage.style.fontSize = '20px';
  popupMessage.style.margin = '0';
  popupMessage.style.textAlign = 'center';
  popupMessage.style.color = '#fff';
  popupMessage.innerText = message;

  // Create a button element to close the popup
  const closeButton = document.createElement('button');
  closeButton.style.display = 'block';
  closeButton.style.margin = '20px auto 0';
  closeButton.style.background = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.padding = '12px 24px';
  closeButton.style.fontSize = '20px';
  closeButton.style.color = 'red';
  closeButton.style.cursor = 'pointer';
  closeButton.innerText = 'Close';
  closeButton.onclick = function() {
    popupDiv.remove();
  };

  // Add the popup content elements to the popup div
  popupDiv.appendChild(popupMessage);
  popupDiv.appendChild(closeButton);

  // Add the popup div to the document body
  document.body.appendChild(popupDiv);
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
}

function add() {
  document.getElementById("canva").style.display = "block";
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.greeting != "temp") {
  if(request.greeting == "NoSVG") {
    chrome.scripting.executeScript({
      target: {tabId: sender.tab.id},
      function: createPopup,
      args: [("No SVGs found in selected region!")],
    })
  } else {
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
}
  }
  running = false;
  changeIcon();
});

chrome.action.onClicked.addListener((tab) => {

  if (running == false) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id, allFrames : true },
        files: ["cscript.js"],
      },
      () => {}
    );
    running = true;
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames : true },
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
      target: { tabId: tab.id, allFrames : true },
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

function changeIcon() {
  chrome.tabs.query({active: true}, function(tab){
    chrome.action.setIcon(
      { path: "images/Iconsmind-Outline-Hand-Touch-2.png" },
      () => {
        /* ... */
      }
    );
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames : true },
      function: del,
    });
  });
  running = false;
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
  changeIcon();
});

//listen for current tab to be changed
/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  changeIcon();
});*/