//частица
function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
	
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = 0.1;
    this.size = 2;

    this.resistance = 1;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0.12;
    this.color = 0;
}

//update - уменьшение, сокращение размера, выцветание
Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
};

//проверка на существование частицы
Particle.prototype.exists = function() {
    return this.alpha >= 0.1 && this.size >= 1;
};

//отрисовка
Particle.prototype.render = function(c) {
    if (!this.exists()) {
		this.attenuation();
        return;
    }

    c.save();
    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//--------------------------------------------

function Rocket(x, y) {
    Particle.apply(this, [{
        x: x,
        y: y}]);

    this.explosionColor = 0;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

//отрисовка сияния
Rocket.prototype.explode = function() {
    var count =  Math.random() * 10 + 10;//Math.random() * 10 + 50;
	particles = [];
	//var angle = Math.random() * Math.PI * 2;//getRandomInt(0, 361);
	
	var angle = 0, delta = getRandomInt(30, 61);
	// emulate 3D effect by using cosine and put more particles in the middle
       
		
    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);

        var speed = Math.cos(Math.random() * Math.PI / 2) * getRandomInt(1, 10);//Math.cos(Math.random() * Math.PI / 2) * getRandomInt(1, 10);
	
        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 2;//10;

        particle.resistance = 1;
        particle.shrink = Math.random() * 0.05 + 0.93; //спад

        particle.flick = false;//true;
        particle.color = this.explosionColor;

        particles.push(particle);
		
		angle = angle + delta;
		//if(angle > 360){
		//	angle =0;
		//}
    }
};

//затухание 
Rocket.prototype.attenuation = function() {
	context.drawImage(background,0,0);
};

//отрисовка
Rocket.prototype.render = function(c) {
    if (!this.exists()) {
		this.attenuation();
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};  



//установка параметров
var SCREEN_WIDTH = 950,//window.innerWidth,
    SCREEN_HEIGHT = 235,//window.innerHeight,
    mousePos = { x: 400, y: 300 },

    // create canvas
    canvas = document.getElementById('canvas'),//document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    rockets = [],
    //MAX_PARTICLES = 2,
    colorCode = 0,
	background = new Image(),
	y_top = 90, y_bottom = 160, x_top = 80, x_bottom = 620;

	
//инициализация элемента
$(document).ready(function() {
    //document.body.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    setInterval(launch, 2000);
    setInterval(loop, 20); //1000 / 50);
	background.src = "../../Content/pic/banner.png";
	background.onload = function(){ context.drawImage(background,0,0); }
});

//задаем начальные координаты, которые попадают в заданный диапазон, прорисоваваем только то сияние,
function launch() {
    //launchFrom(mousePos.x, mousePos.y);
	//var xx = getRandomInt(1, 950), yy =getRandomInt(1, 235);
	var xx = getRandomInt(80, 620), yy =getRandomInt(90, 160);
	
	//if(yy > y_top && yy < y_bottom && xx > x_top && xx < x_bottom){
		launchFrom(xx, yy);
	//}
}

function launchFrom(x, y) {
	rockets = [];
	particles = [];
    //if (rockets.length < 10) {
        var rocket = new Rocket(x, y);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 1;
        rocket.shrink = 0.999;
        rockets.push(rocket);
   // }
}

function loop() {
    var existingRockets = [];

    for (var i = 0; i < rockets.length; i++) {
        // update and render
        rockets[i].update();
        rockets[i].render(context);

		/* Explosion rules */
        if (rockets[i].pos.y > y_top && rockets[i].pos.y < y_bottom && rockets[i].pos.x > x_top && rockets[i].pos.x < x_bottom){
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets; 
	
    var existingParticles = [];

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > Math.floor(Math.random() * 360 / 10) * 10){//MAX_PARTICLES) {
        particles.shift();
    }
}