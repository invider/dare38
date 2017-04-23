
var Player = function(x, y, scene) {
	//ActiveElement.apply(this, arguments);
	ActiveElement.call(this, x, y, scene, [ scene.res.img['jet-man'] ], 100);
	this.type = "Player";
};

Util.extend(Player, ActiveElement);
Player.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);

	if (scene.keys[39]){
		this.horzAcceleration = 17;
	} else if (scene.keys[37]){
		this.horzAcceleration = - 17;
	} else {
		this.horzAcceleration = 0;
	}
	if (scene.keys[38]){
		this.acceleration = 20;
	} else {
		this.acceleration = 0;
	}
	if (scene.keys[32]){
		delete scene.keys[32];
		scene.root.planet.spawnWall(this.x, this.y + 1, Math.random() > 0.5 ? "W": "G");
	}
    if (scene.keys[67]){
        scene.root.planet.attach(new Bomb(1000, this.x, this.y));
    }
	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);
};

Player.prototype.render = function(ctx, scene) {
    //ctx.drawImage(scene.res.img['jet-man'],this.x,this.y, 1, 1);
    ActiveElement.prototype.render.call(this, ctx, scene);
};

Player.prototype.kill = function(){
	var my = this;
	setTimeout(function(){
		my.scene.root.spawnPlayer();
	}, 1000);

};
