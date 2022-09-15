//let svgs = Array.from(document.querySelectorAll('img[src*=".svg"]'));
//console.log(svgs)
let svgs = document.querySelectorAll('svg')
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "test") {
        //console.log(Array.from(svgs)[0].outerHTML)
        //sendResponse({resp: Array.from(svgs)})
        console.log(svgs.item(0).outerHTML)
        sendResponse({resp: svgs.item(0).outerHTML});
      }
    }
  );