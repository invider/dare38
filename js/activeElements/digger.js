var Digger = function(x, y, planet) {
	//ActiveElement.apply(this, arguments);
    ActiveElement.call(this, x, y, planet, [ planet.scene.res.img['dig-man'], planet.scene.res.img['jet-man'] ], 1000);

	this.type = "Digger";
};
Util.extend(Digger, ActiveElement);

Digger.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);

	var killWall = function(wall){
		wall.stroke(delta * 100);
	};
	var location = this;
	var dropped = function(wall) {
		var p = scene.root.planet.getSpawnPoint();
		var dx = p.x - location.x;
		var dy = p.y - location.y;
		var s = Math.sign(dx);
		var sideWall = scene.root.planet.getElement(location.x + s, location.y);
		if((Math.abs(dx) > Math.abs(dy)) && !(sideWall instanceof UnbreakableWall) || wall instanceof UnbreakableWall) {
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
