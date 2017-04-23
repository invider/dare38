var Digger = function(x, y, planet) {
	ActiveElement.apply(this, arguments);
	this.type = "Digger";
};
Util.extend(Digger, ActiveElement);

Digger.prototype.evolve = function(delta, scene) {
	var killWall = function(wall){
		wall.stroke(delta * 100);
	};
	scene.physics.clearEvents();
	scene.physics.onWall(killWall);
	scene.physics.onHorzWall(killWall);
	scene.physics.evolve(this, delta);

	//
	//	FIXME: this is not working yet
	//
	Util.killOnlyPlayer(scene, this.x, this.y);
};

Digger.prototype.render = function(ctx, scene) {
    ctx.drawImage(scene.res.img['dig-man'],this.x,this.y, 1, 1);
};
