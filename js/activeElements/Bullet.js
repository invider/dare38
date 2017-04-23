var Bullet = function(x, y, scene) {
	ActiveElement.apply(this, arguments);
	this.airFrictionFactor = 0;
	this.acceleration = scene.physics.gravity;
	this.power = 50;
	this.type = "Bullet";
};
Util.extend(Bullet, ActiveElement);

Bullet.prototype.evolve = function(delta, scene) {
	scene.physics.clearEvents();
	var my = this;
	var wallHit = function(){
		scene.root.kill(my);
	};
	scene.physics.onHorzWall(wallHit);
	scene.physics.onWall(wallHit);
	scene.physics.evolve(this, delta);
	scene.root.getNearbyNodes(this.x, this.y)
		.forEach(function(node){
			if (node instanceof Digger){
				node.hit(my.power);
				wallHit();
			}
		});
};

Bullet.prototype.render = function(ctx, scene) {
    ctx.drawImage(scene.res.img['shot-1'],this.x, this.y, 0.3, 0.3);
};
