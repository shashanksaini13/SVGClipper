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

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canva")
const body = document.body;
const html = document.documentElement;
let windowWidth = window.innerWidth;
let windowHeight = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

canvas.width = windowWidth;
canvas.height = windowHeight;

Object.assign(canvas.style, {
  position: "absolute",
  zIndex: 1000,
  width: windowWidth + "px",
  top: "0",
  left: "0",
});

body.appendChild(canvas);
const cont = canvas.getContext("2d")
var start = {};
var end = {};
var isSelecting = false;

canvas.addEventListener("mousedown", (e) => {
  isSelecting = true;
  start.x = e.pageX;
  start.y = e.pageY;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isSelecting) {
    return;
  }
  cont.clearRect(0, 0, windowWidth, windowHeight);
  end.x = e.pageX;
  end.y = e.pageY;
  var left = start.x < end.x ? start.x : end.x;
  var top = start.y < end.y ? start.y : end.y;
  var width = Math.abs(start.x - end.x);
  var height = Math.abs(start.y - end.y);
  cont.fillStyle = "rgba(254,121,104,0.5)";
  cont.strokeStyle = "red";
  cont.strokeRect(left, top, width, height);
  cont.fillRect(left, top, width, height);
});

canvas.addEventListener("mouseup", (e) => {
  isSelecting = false;
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    var left = start.x < end.x ? start.x : end.x;
    var top = start.y < end.y ? start.y : end.y;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    if (request.message == "test") {
      sendResponse({ sx: left, ex: top, sy: width, ey: height });
    }
  });
  Array.from(svgs, (e) => {
    let first = e.getBoundingClientRect();
    var left = start.x < end.x ? start.x : end.x;
    var top = start.y < end.y ? start.y : end.y;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    if (first.x >= left && first.y >= top && first.width <= (width - first.x) && first.height <= (height - first.y)) {
      cont.strokeStyle = "green";
      cont.fillStyle = cont.fillStyle = "rgba(104,121,104,0.5)";
      cont.strokeRect(first.x, first.y, first.width, first.height);
      cont.fillRect(first.x,first.y,first.width,first.height);
    }
  });
});