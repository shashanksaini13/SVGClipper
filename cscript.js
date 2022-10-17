//let svgs = Array.from(document.querySelectorAll('img[src*=".svg"]'));
let svgs = document.querySelectorAll("svg");
let i = 0;
Array.from(svgs, (e) => {
  let first = e.getBoundingClientRect();
  console.log(
    "SVG #" +
      i +
      "\nX: " +
      first.x +
      "\nY: " +
      first.y +
      "\nWidth: " +
      first.width +
      "\nHeight: " +
      first.height
  );
  i++;
});
console.log(svgs);

/*chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message != "test") {
    let arr = request.message.split(" ");
    console.log(arr);
    Array.from(svgs, (e) => {
      let first = e.getBoundingClientRect();
      if (e.x > arr[0] + arr[2] && e.y > arr[1] + arr[3])
        document.body.style.backgroundColor = "green";
    });
  }
  sendResponse({status: "done"});
});*/
