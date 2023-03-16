let final = [];
let temp = [];
/*document.querySelectorAll('iframe').forEach( item =>
  console.log(item.contentWindow.document.body.querySelectorAll('svg'));
)*/

/*if(frames.length > 0) {
  var url = frames[0].src;
  var tab = window.open(url, '_blank');
  tab.focus();
}*/

let frames = new Map()
document.querySelectorAll('iframe').forEach((iframe)=> {
  temp = Array.from((iframe.contentWindow.document).querySelectorAll("svg"));
  Array.from (temp, (e) => {
    frames.set(e, iframe);
  });
  final = final.concat(temp);
});

console.log(final);

let svgs = ((Array.from(document.querySelectorAll("svg"))));
let svgIDs = [];
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
  if(e.id == "")
    e.setAttribute("id", "SVG " + i);
  svgIDs.push(e.id);
  i++;
});
console.log(svgIDs);
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

document.getElementById("canva").style.cursor = "crosshair";

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

function getOffset(element)
{
    var bound = element.getBoundingClientRect();
    var html = document.documentElement;

    return {
        top: bound.top + window.pageYOffset - html.clientTop,
        left: bound.left + window.pageXOffset - html.clientLeft
    };
}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  return wrapper;
}

canvas.addEventListener("mouseup", (ev) => {
  isSelecting = false;
  cont.clearRect(0, 0, windowWidth, windowHeight);
  Array.from(final, (e) => {
    let first = frames.get(e).getBoundingClientRect();
    if (e.getAttribute("width") != "0" && e.getAttribute("height") != "0") {
      var left = start.x < end.x ? start.x : end.x;
      var top = start.y < end.y ? start.y : end.y;
      var width = Math.abs(start.x - end.x);
      var height = Math.abs(start.y - end.y);
      if (!(((first.x + first.width) < left) || ((left + width) < first.x) || (first.y + first.height < top) || ((top+height) < first.y))) {
        cont.strokeStyle = "green";
        cont.fillStyle = cont.fillStyle = "rgba(104,121,104,0.5)";
        cont.strokeRect(first.x, first.y, first.width, first.height);
        cont.fillRect(first.x,first.y,first.width,first.height);
        chrome.runtime.sendMessage({greeting: e.id}, function(response) {
        });
      }
    }
  });
  Array.from(svgs, (e) => {
    let first = e.getBoundingClientRect();
    var left = start.x < end.x ? start.x : end.x;
    var top = start.y < end.y ? start.y : end.y;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    if (!(((first.x + first.width) < left) || ((left + width) < first.x) || (first.y + first.height < top) || ((top+height) < first.y))) {
      cont.strokeStyle = "green";
      cont.fillStyle = cont.fillStyle = "rgba(104,121,104,0.5)";
      cont.strokeRect(first.x, first.y, first.width, first.height);
      cont.fillRect(first.x,first.y,first.width,first.height);
      chrome.runtime.sendMessage({greeting: e.id}, function(response) {
      });
    }
  });
  document.getElementById("canva").style.display = "block";
});
