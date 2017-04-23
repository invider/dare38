var Canon = function(x, y, planet) {
	ActiveElement.apply(this, arguments);
	this.type = "Canon";
	/** @type {ActiveElement|boolean} */
	this.enemy = false;
};
Util.extend(Canon, ActiveElement);

Canon.prototype.evolve = function(delta, scene) {
	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);
	
};

Canon.prototype.render = function(ctx, scene) {
    ctx.drawImage(scene.res.img['dig-man'],this.x,this.y, 1, 1);
};
