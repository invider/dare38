var Bullet = function(x, y, scene) {
	ActiveElement.apply(this, arguments);
	this.airFrictionFactor = 0;
	this.type = "Bullet";
};
Util.extend(Bullet, ActiveElement);

Bullet.prototype.evolve = function(delta, scene) {
	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);
};

Bullet.prototype.render = function(ctx, scene) {
    ctx.drawImage(scene.res.img['shot-2'],this.x, this.y, 1, 1);
};
