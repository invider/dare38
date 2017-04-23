
var Player = function(x, y, scene) {
	ActiveElement.apply(this, arguments);
};

Util.extend(Player, ActiveElement);
Player.prototype.evolve = function(delta, scene) {
	if (scene.keys[39]){
		this.horzAcceleration = 3;
	} else if (scene.keys[37]){
		this.horzAcceleration = - 3;
	} else {
		this.horzAcceleration = 0;
	}
	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);
};

Player.prototype.render = function(ctx) {
	ctx.beginPath();
	ctx.rect(this.x, this.y, 1, 1);
	ctx.fillStyle = '#e60073';
	ctx.fill();
};