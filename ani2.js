/*
  Charles Weng
  SoftDev2 pd7
  K #08: Animation Nation
  2018-3-2
*/


/*
  =======================================================================
                                  Variables/Initiation
  =======================================================================
*/

// the svg element
var pic = document.getElementById('vimage');
var frame = 0;
// do circle or triangle?
var circle;
// how fast does the circle do its thing
var circleSpeed = 21;
// how do you like your square?
var squareW = 70;
var squareH = 50;
// how fast in each direction should it go?
var velocity = [2,2];
// logo stuffs
var logo = new Image();
logo.src = "./DVD.png";

/*
  =======================================================================
                                  Functions
  =======================================================================
*/

// clear function
const clear = function(){
  // while there are children, remove a child
  while(pic.children.length)
    pic.firstChild.remove();
}

// draw function
const draw = function(){
  if (circle){
    drawC();
    return;
  }
  drawR();
}

// draw circle
const circle = function(x, y, r){
  var cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  cir.setAttribute("cx", x);
  cir.setAttribute("cy", y);
  cir.setAttribute("r", r);
  cir.setAttribute("fill", "red");
  cir.setAttribute("stroke", "black");
  cir = pic.appendChild(cir);
}

// does the circle thing
const drawC = function(){
  clear();
  ctx.fillStyle ="#FF0000";
  ctx.beginPath();
  // draw the circle
  ctx.moveTo(parseInt($('#slate')[0].width) / 2 , parseInt($('#slate')[0].height) / 2);
  ctx.arc(parseInt($('#slate')[0].width) / 2 , parseInt($('#slate')[0].height) /  2, 100 + Math.abs(circleSpeed * frame % 100 - 50), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  frame = window.requestAnimationFrame(drawC);
  console.log(frame);
}

// draw circle
const dvd = function(x, y, w, h){
  var cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  cir.setAttribute("cx", x);
  cir.setAttribute("cy", y);
  cir.setAttribute("r", r);
  cir.setAttribute("fill", "red");
  cir.setAttribute("stroke", "black");
  cir = pic.appendChild(cir);
}

// does the dvd thing
const drawR = function(){
  clear();
  ctx.fillStyle ="#FF0000";
  // upper left corner of square
  ctx.beginPath();
  var squareC = [0,0];
  squareC[0] = Math.abs(velocity[0] * frame % ((parseInt($('#slate')[0].width) - squareW) * 2) - parseInt($('#slate')[0].width - squareW));
  squareC[1] = Math.abs(velocity[1] * frame % ((parseInt($('#slate')[0].height) - squareH) * 2) - parseInt($('#slate')[0].height - squareH));
  // ctx.fillRect(squareC[0], squareC[1], squareW, squareH);
  ctx.drawImage(logo, squareC[0], squareC[1], squareW, squareH);
  frame = window.requestAnimationFrame(drawR);
  console.log(frame);
}

const stop = function(){
  window.cancelAnimationFrame(frame);
}

/*
  =======================================================================
                                  Button Stuff
  =======================================================================
*/

// add event listenters
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("start1").addEventListener("click", function(){
  stop();
  circle = true;
  draw();
});
document.getElementById("start2").addEventListener("click", function(){
  stop();
  circle = false;
  draw();
});
