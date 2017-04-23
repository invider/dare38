var Digger = function(x, y, scene) {
    ActiveElement.call(this, x, y, scene, [ scene.res.img['dig-man'], scene.res.img['jet-man'] ], 1000);

	this.type = "Digger";
};
Util.extend(Digger, ActiveElement);

Digger.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);

	var killWall = function(wall){
		wall.hit(delta * 100);
	};
	
	var location = this;
	var dropped = function(wall) {
		var p = scene.root.planet.getSpawnPoint();
		var dx = p.x - location.x;
		var dy = p.y - location.y;
		var s = Math.sign(dx);
		var headWall = scene.root.planet.getElement(location.x + s, location.y);
		var backWall = scene.root.planet.getElement(location.x - s, location.y);
		if((Math.abs(dx) > Math.abs(dy)) && !(headWall instanceof UnbreakableWall) || wall instanceof UnbreakableWall) {
			s = headWall instanceof UnbreakableWall ? -s : s;
			scene.physics.accelerateToMaxHorzSpeed(location, 2 * s, 2);
		} else {
			location.horzAcceleration = 0;
			killWall(wall);
		}
	}
	
	scene.physics.clearEvents();
	scene.physics.onWall(dropped);
	scene.physics.onHorzWall(killWall);
	scene.physics.evolve(this, delta);

	//
	//	FIXME: this is not working yet
	//
	Util.killOnlyPlayer(scene, this.x, this.y);
};

Digger.prototype.render = function(ctx, scene) {
    // ctx.drawImage(scene.res.img['dig-man'],this.x,this.y, 1, 1);
    ActiveElement.prototype.render.call(this, ctx, scene);
};
