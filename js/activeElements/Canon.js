var Canon = function(x, y, scene) {
	ActiveElement.apply(this, arguments);
	this.type = "Canon";
	/** @type {ActiveElement|boolean} */
	this.enemy = false;
	this.r = 20;
	this.lastShot = new Date().getTime();
	this.shotInterval = 1000;
};
Util.extend(Canon, ActiveElement);
Canon.prototype.spawnBullet = function(target){
	var bullet = new Bullet(this.x, this.y, this.scene);
	bullet.horzVelocity = Util.getXVector(this.x, this.y, target.x, target.y);
	bullet.velocity = Util.getXVector(this.y, this.y, target.y, target.y);
	this.scene.attach(bullet);
};

Canon.prototype.evolve = function(delta, scene) {
	var my = this;
	if (new Date().getTime() - this.lastShot > this.shotInterval){
		var nodes = scene.root.getNearbyNodes(this.x, this.y, this.r)
			.filter(function(node){
				return node instanceof Digger;
			})
			.sort(function(a, b){
				var a = Util.getLength(my.x, my.y, a.x, a.y);
				var b = Util.getLength(my.x, my.y, b.x, b.y);
				return a - b;
			});
		if (nodes.length){
			this.spawnBullet(nodes[0]);
			this.lastShot = new Date().getTime();
		}
	}

	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);
};

Canon.prototype.render = function(ctx, scene) {
    ctx.drawImage(scene.res.img['dig-man'],this.x,this.y, 1, 1);
};
