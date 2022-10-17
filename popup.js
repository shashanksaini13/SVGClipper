chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { message: "test" }, function (response) {
    document.getElementById("dialog-box").innerHTML = response.sx + " " + response.sy + " " + response.ex + " " + response.ey;
    
    chrome.tabs.sendMessage(tabs[0].id, { message: response.sx + " " + response.sy + " " + response.ex + " " + response.ey }, function (response) {
      console.log("hi");
    });


  });
});

/*document.addEventListener('DOMContentLoaded', () => {
  const dialogBox = document.getElementById('dialog-box');;
  const query = { active: true, currentWindow: true };

  chrome.tabs.query(query, (tabs) => {
      dialogBox.innerHTML = document.querySelectorAll('svg');
  });
})*/

/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    document.getElementById('dialog-box').innerHTML = request.message?.item(0)
    //document.getElementById('dialog-box').innerHTML = "hi"
    //document.getElementById('dialog-box').innerHTML = request.message
    //console.log(request.message)
  }
);*/
