(function(window) {
var ctx   = null;
var image = new Image();
var audio = new Audio();
var date  = new Date();
var dt    = 0;
var ticks = 0;

var r     = 0;
var r1    = 0;
var r2    = 0;
var r3    = 0;
var delay = 0;
var dx    = 0;
var dy    = 0;
var rnd   = 0;
var xx    = -150;
var yy    = -150;
var xxx   = -150;

function fx1()
{
	ctx.save();
	ctx.translate(512, 256);
	ctx.rotate(r1 * Math.PI / 180);
	ctx.scale(Math.sin(ticks * 0.001) * 2, Math.sin(ticks * 0.001) * 2);
	ctx.drawImage(image, 0, 0, 512, 512, -512, -512, 1024, 1024);
	ctx.restore();

   r += dt * 0.1;
	r1 += dt * 0.1;
}

function fx2()
{
 	ctx.save();
	ctx.translate(512, 256);
	ctx.rotate(r2 * Math.PI / 180);
	ctx.scale(Math.cos(ticks * 0.001) * 2, Math.sin(ticks * 0.001) * 2);
	ctx.drawImage(image, 0, 0, 512, 512, -512, -512, 1024, 1024);
	ctx.restore();

   r += dt * 0.1;
	r2 += dt * 0.1;
}

function fx3()
{
 	ctx.save();
	ctx.translate(512, 256);
	ctx.rotate(r3 * Math.PI / 180);
	ctx.scale(Math.cos(ticks * 0.001) * 3, Math.cos(ticks * 0.001) * 3);
	ctx.drawImage(image, 0, 0, 512, 512, -512, -512, 1024, 1024);
	ctx.restore();

   r += dt * 0.1;
	r3 += dt * 0.2;
}

function fx4()
{
  if(delay > 21000)
  {
    delay = 0;
    dx = 0;
    dy += 1;
    xx = -250 * dy;
    rnd = 100 + Math.random() * 300;
  }

  if(dy > 4)
    return;

  delay += dt;

	ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.translate(400 + (Math.sin(r * 0.1) * 30), 
				  200 + (Math.cos(r * 0.1) * 30));

	ctx.rotate(Math.sin(r * 0.1) * 0.2);
	ctx.drawImage(image, 900, (dy * 400), 1024, 400, -512, -300, 1024, 400);
	ctx.restore();

	// fill: fee168
	// stroke: eec74a
	ctx.save();
	ctx.beginPath();
	
  ctx.bezierCurveTo(-50     , 210, 
                    dx      , 100 - dx / 10 + Math.sin(r * 0.2) * 60, 
                    dx * 1.5, 100 - dx / 10 + Math.cos(r * 0.2) * 45);

	ctx.strokeStyle = "#EEA917";
	ctx.lineWidth = 20;
	ctx.stroke();
	ctx.strokeStyle = "#FEE168";
	ctx.lineWidth = 13;
	ctx.stroke();
	ctx.restore();
	
  dx += dt * 0.05;
	
	ctx.save();
	ctx.translate(200 + rnd + 75, 10 + 72);
	ctx.rotate(Math.cos(r * 0.2) * 0.5);
	ctx.drawImage(image, (dy * 150), 600, 150, 142, -75, -72, 150, 142);
	ctx.restore();

	r += dt * 0.01;
}

function fx5(text, x, y, a, color)
{
  ctx.save();
	ctx.font = 'italic 40pt Arial';
  ctx.fillStyle = color || "#BB0000";

	var text = text.split(' ');
	var ang = a || 5; 
  var i = 0;
	while(text.length > 0)
	{
		var c = text.pop();
		ctx.fillText(c, x + Math.cos(r * ang * Math.PI / 180) * 95 + 0.001, 
						y + Math.sin(r * ang * Math.PI / 180) * 95 + 0.001);
		
		ang += a || 5;
		i += 8;
	}

  ctx.restore();
}

function fx6()
{
  if(dy > 0 && dy < 3)
    fx5("H a p p y", xx, 110, "#0000BB");

  if(dy > 1 && dy < 3)
    fx5("B i r t h d a y", xx + 250, 110, -5, "#000000");

  if(dy > 2)
    fx5("V a l e r i a", xx + 500, 110, 5);

  xx += dt * 0.08;
}

function fx7()
{
  for(var i=0; i<10; i++)
  {
    var y = (i*20);

  	ctx.save();
	  ctx.beginPath();
  
    ctx.bezierCurveTo(0,   Math.sin(r * 0.3) * 180 , 
                      400, Math.sin(r * 0.2) * 360, 
                      800, Math.cos(r * 0.1) * 360);

    ctx.strokeStyle = "#BB0000";
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.strokeStyle = "#0000BB";
    ctx.lineWidth = 13;
    ctx.stroke();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();	
  }

  r += dt * 0.01;
}

function fx8()
{
  ctx.save();
	ctx.font = 'italic 40pt Arial';
 
	var text = 'H a p p y B i r t h d a y V a l e r i a'.split(' ');
	var ang = 2;
  var i = 0;
	while(text.length > 0)
	{
		var c = text.shift();
    var y = 110 + Math.sin(r * ang * Math.PI / 180) * 45 + 0.05;

    ctx.fillStyle = "#00FFBB";
    ctx.fillRect(xxx + i, -y, 16, 48);
    ctx.fillStyle = "#CCBBFF";
		ctx.fillText(c, xxx + i, //Math.cos(r * ang * Math.PI / 180) * 95 + 0.001, 
						        y);
		
		ang += 2;
		i += 16;
	}

  ctx.restore();

  xxx += dt * 0.08;

  if(xxx > 850)
    xxx = -150;
}

var effects = [
  { s: 0,     e: 10000, fn: fx1 },
  { s: 10000, e: 20000, fn: fx2 },
  { s: 20000, e: 30000, fn: fx1 },
  { s: 20000, e: 40000, fn: fx2 },
  { s: 40000, e: 50000, fn: fx1 },
  { s: 41000, e: 52000, fn: fx2 },
  { s: 52000, e: 62000, fn: fx2 },
  { s: 53000, e: 61000, fn: fx3 },
  { s: 54000, e: 63000, fn: fx1 },
  { s: 63100, e: 200000, fn: fx4 },
  { s: 63100, e: 200000, fn: fx6 },
  { s: 200000, e: 253666, fn: fx7 },
  { s: 200000, e: 253666, fn: fx8 }
];

//effects = [{s: 0, e: 500000, fn: fx4},
//           {s: 0, e: 500000, fn: fx6}]

//effects = [{s: 0, e: 500000, fn: fx7},
//           {s: 0, e: 500000, fn: fx8}]


var length = 253666;

function loop()
{
  var now = new Date();
  dt = now - date;
  ticks += dt;
  date = now;
  
  window.ttt = ticks;

  for(var i=0; i<effects.length; i++)
  {
    var e = effects[i];

    if(ticks >= e.s && ticks <= e.e)
      e.fn();
  }

  // loop xD
  if(ticks >= length)
  {
    delay = 0;
    dx = 0;
    dy = 0;
    xx = -150;
    xxx = -150;
    rnd = 100 + Math.random() * 300;
    ticks = 0; // loop
  }

  requestAnimationFrame(loop);
}

function main()
{
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.blockmageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;

  loop();
}

window.onload = function()
{
  image.src = 'data/atlas.png';
  image.onload = main;

  audio.addEventListener('loadedmetadata', function()
  {
    this.loop = true;
    this.play();  
  });

  if(!!audio.canPlayType('audio/ogg'))
    audio.src = 'data/song.ogg';
  else if(!!audio.canPlayType('audio/mp3'))
    audio.src = 'data/song.mp3';

};
})(window);
