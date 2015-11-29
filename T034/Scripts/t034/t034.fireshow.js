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

function Star(x, y) {
    Particle.apply(this, [{
        x: x,
        y: y}]);

    this.explosionColor = 0;
}

Star.prototype = new Particle();
Star.prototype.constructor = Star;

//отрисовка сияния
Star.prototype.explode = function () {
    var count =  Math.random() * 10 + 10;//Math.random() * 10 + 50;
	particles = [];

	var angle = 0, delta = getRandomInt(30, 61);

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * getRandomInt(1, 10);
	
        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 2;

        particle.resistance = 1;
        particle.shrink = Math.random() * 0.05 + 0.93; //спад

        particle.flick = false;//true;
        particle.color = this.explosionColor;

        particles.push(particle);
		
		angle = angle + delta;
    }
};

//затухание 
Star.prototype.attenuation = function () {
	context.drawImage(background,0,0);
};

//отрисовка
Star.prototype.render = function (c) {
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

//задаем начальные координаты, которые попадают в заданный диапазон, прорисоваваем только то сияние,
function launch() {
    launchFrom(getRandomInt(x_top, x_bottom), getRandomInt(y_top, y_bottom));
}

function launchFrom(x, y) {
    stars = [];
	particles = [];

	var star = new Star(x, y);
    star.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
    star.vel.y = Math.random() * -3 - 4;
    star.vel.x = Math.random() * 6 - 3;
    star.size = 1;
    star.shrink = 0.999;
    stars.push(star);
}

function loop() {
    var existingStars = [];

    for (var i = 0; i < stars.length; i++) {
        // update and render
        stars[i].update();
        stars[i].render(context);

		/* Explosion rules */
        if (stars[i].pos.y > y_top && stars[i].pos.y < y_bottom && stars[i].pos.x > x_top && stars[i].pos.x < x_bottom) {
            stars[i].explode();
        } else {
            existingStars.push(stars[i]);
        }
    }

    stars = existingStars;
	
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

    while (particles.length > Math.floor(Math.random() * 360 / 10) * 10){
        particles.shift();
    }
}