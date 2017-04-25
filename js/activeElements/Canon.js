var Canon = function(x, y, scene) {
    ActiveElement.call(this, x, y, scene, [ scene.res.img['gun-man'] ], 100);
	this.type = "Canon";
	/** @type {ActiveElement|boolean} */
	this.enemy = false;
	this.r = 20;
	this.bulletSpeed = 10;
	this.lastShot = new Date().getTime();
	this.shotInterval = 1000;
};
Util.extend(Canon, ActiveElement);
Canon.prototype.spawnBullet = function(target){
	var bullet = new Bullet(this.x, this.y, this.scene);
	var len = Util.getLength(this.x, this.y, target.x, target.y)
	bullet.horzVelocity = this.bulletSpeed * (Util.getXVector(this.x, this.y, target.x, target.y) / len);
	bullet.velocity = this.bulletSpeed * (Util.getXVector(this.y, this.y, target.y, target.y) / len);
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
    ActiveElement.prototype.render.call(this, ctx, scene);
};

Canon.prototype.kill = function() {
    this.scene.root.explode('gun', this)
}
