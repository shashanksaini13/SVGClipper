const canvas = document.createElement('canvas');
const scale = window.devicePixelRatio;
const body = document.body;
const html = document.documentElement;
let windowWidth = window.innerWidth;
let windowHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

canvas.width = windowWidth * scale;
canvas.height = windowHeight * scale;

Object.assign(canvas.style, {
    position: "absolute",
    zIndex: 1000,
    width: windowWidth + 'px',
    top: '0',
    left: '0'
});

body.appendChild(canvas);
const cont = canvas.getContext('2d');
cont.strokeStyle = "blue";
var start = {};
var end = {};
var isSelecting = false;


canvas.addEventListener('mousedown', (e) => {
    isSelecting = true;
    start.x = e.pageX;
    start.y = e.pageY;        
});

canvas.addEventListener('mousemove', (e) => {
        if (!isSelecting) { return; }
        cont.clearRect(0,0,windowWidth,windowHeight);
        end.x = e.pageX;
        end.y = e.pageY;
        var left = start.x < end.x ? start.x : end.x;
        var top = start.y < end.y ? start.y : end.y;
        var width = Math.abs(start.x - end.x);
        var height = Math.abs(start.y - end.y);
        cont.strokeRect(left, top, width, height);
});
canvas.addEventListener('mouseup', (e) => {
        isSelecting = false;
});