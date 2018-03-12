/*
  Charles Weng
  SoftDev2 pd7
  K #08: Animation Nation
  2018-3-2
*/


/*
  ==============================================================================
                                  Variables/Initiation
  ==============================================================================
*/

// the svg element
var pic = document.getElementById('vimage');
var frame = 0;
// do circle or triangle?
var docircle;
// circle things
var circleSpeed = 2;
// dvd things
var squareW = 70;
var squareH = 50;
var velocity = [6,1];
DVDsrc = "./DVD.png";

/*
  ==============================================================================
                                  Functions
  ==============================================================================
*/

// clear function
const clear = function(){
  // while there are children, remove a child
  while(pic.children.length)
    pic.firstChild.remove();
}

// draw function
const draw = function(){
  if (docircle){
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
  circle(parseInt(pic.getAttribute("width")) / 2, parseInt(pic.getAttribute("height")) / 2, 100 + Math.abs(circleSpeed * frame % 100 - 50));
  frame = window.requestAnimationFrame(drawC);
  console.log(frame);
}

// draw dvd
const dvd = function(x, y, w, h){
  var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
  svgimg.setAttribute('height', squareH);
  svgimg.setAttribute('width', squareW);
  svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href',DVDsrc);
  svgimg.setAttribute('x', x);
  svgimg.setAttribute('y', y);

  pic.appendChild(svgimg);
}

// does the dvd thing
const drawR = function(){
  clear();
  // upper left corner of square
  var square = [0,0];
  square[0] = Math.abs(velocity[0] * frame % ((parseInt(pic.getAttribute("width")) - squareW) * 2) - parseInt(pic.getAttribute("width") - squareW));
  square[1] = Math.abs(velocity[1] * frame % ((parseInt(pic.getAttribute("height")) - squareH) * 2) - parseInt(pic.getAttribute("height") - squareH));
  dvd(square[0], square[1], squareW, squareH);
  frame = window.requestAnimationFrame(drawR);
  console.log(square)
  console.log(frame);
}

const stop = function(){
  window.cancelAnimationFrame(frame);
}

/*
  ==============================================================================
                                  Button Stuff
  ==============================================================================
*/

// add event listenters
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("start1").addEventListener("click", function(){
  stop();
  docircle = true;
  draw();
});
document.getElementById("start2").addEventListener("click", function(){
  stop();
  docircle = false;
  draw();
});
