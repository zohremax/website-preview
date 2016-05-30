// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
// ends requestAnimationFrame polyfill

var c = document.getElementById("heart");
var ctx = c.getContext("2d");
var cw = c.width = 500;
var ch = c.height = 500;
var cx = cw / 2,
  cy = ch / 2;
var rad = Math.PI / 180;
var howMany = 500;

var p = [];
//http://www.colourlovers.com/palette/698883/Thankyou_100_Lovers!
var colors = ["242,41,41", "222,80,80", "247,111,111", "255,145,145", "252,199,199"];
//var colors = ["217,65,65", "240,223,223", "255,161,161", "237,126,126", "240,96,137"];

ctx.strokeStyle = "white";
ctx.globalAlpha = .7;

function particles() {

  this.r = randomIntFromInterval(2, 12);

  var innerR = Math.round(Math.random() * 130) + 1;
  var innerA = Math.round(Math.random() * 360) + 1;

  this.x = cx + innerR * Math.cos(innerA * rad);
  this.y = cy + 20 + innerR * Math.sin(innerA * rad);

  this.ix = (Math.random()) * (Math.random() < 0.5 ? -1 : 1); //positive or negative
  this.iy = (Math.random()) * (Math.random() < 0.5 ? -1 : 1); //positive or negative
  this.alpha = Math.random();
  this.c = "rgba(" + colors[Math.round(Math.random() * colors.length) + 1] + "," + this.alpha + ")";
  ////this.c = "rgb("+colors[Math.round(Math.random() * colors.length) + 1]+")";

}

for (var i = 0; i < howMany; i++) {
  p[i] = new particles();
}

function Draw() {
//  ctx.fillStyle = "#5C5392";
ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cw, ch);
  for (var i = 0; i < p.length; i++) {
    ctx.fillStyle = p[i].c;

    // the current path for isPointInPath 
    thePath(p[i].r);

    if (ctx.isPointInPath(p[i].x, p[i].y)) {
      p[i].x += p[i].ix;
      p[i].y += p[i].iy;
      ctx.beginPath();
      ctx.arc(p[i].x, p[i].y, p[i].r, 0, 2 * Math.PI);
      ctx.fill();

    } else {
      p[i].ix = -1 * p[i].ix;
      p[i].iy = -1 * p[i].iy;
      p[i].x += p[i].ix;
      p[i].y += p[i].iy;

    }
  }

  window.requestAnimationFrame(Draw);
}

window.requestAnimationFrame(Draw);

function thePath(r) {

  //draw a heart
  ctx.beginPath();
  ctx.moveTo(250, 200);
  ctx.arc(350, 200, 100 - r, Math.PI, Math.PI * 0.23);
  ctx.lineTo(250, 450);
  ctx.arc(150, 200, 100 - r, Math.PI * 0.77, 0);
  // NO stroke!!!
}

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}