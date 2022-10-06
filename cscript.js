//let svgs = Array.from(document.querySelectorAll('img[src*=".svg"]'));
let svgs = document.querySelectorAll('svg')
let i = 0
Array.from(svgs, e => {
  let first = e.getBoundingClientRect()
  console.log("SVG #" + i + "\nX: " + first.x + "\nY: " + first.y + "\nWidth: " + first.width + "\nHeight: " + first.height)
  i++
}
);
console.log(svgs)
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "test") {
        console.log(Array.from(svgs)[0].outerHTML)
        sendResponse({resp: Array.from(svgs)})
      }
      }
    
  );