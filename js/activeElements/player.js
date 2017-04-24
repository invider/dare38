
var _spawnRate = 2.0;

var Player = function(x, y, scene) {
	ActiveElement.call(this, x, y, scene, [ scene.res.img['jet-man'] ], 100);
	this.bombSpawnRate = 0.0;
	this.type = "Player";
     this.stats = {
		fuel:100,
		maxFuel:100
	}
    this.engine1 = new Explosion(x, y+0.8, -1, 200,
        scene.res.img['particle-yellow'], 0.3, 0, 0.8, 0.2,
        Math.PI/2-Math.PI/16, Math.PI/8, 1, 0.5)
    this.engine2 = new Explosion(x+0.9, y+0.8, -1, 200,
        scene.res.img['particle-yellow'], 0.3, 0, 0.8, 0.2,
        Math.PI/2-Math.PI/16, Math.PI/8, 1, 0.5)
    scene.attach(this.engine1)
    scene.attach(this.engine2)
};

Util.extend(Player, ActiveElement);
Player.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);

    if(this.bombSpawnRate > 0) {
    	this.bombSpawnRate -= delta;
	}

	if (scene.keys[scene.root.env.RIGHT] || scene.keys[scene.root.env._RIGHT]){
		this.horzAcceleration = 17;
    } else if (scene.keys[scene.root.env.LEFT] || scene.keys[scene.root.env._LEFT]){
		this.horzAcceleration = - 17;
	} else {
		this.horzAcceleration = 0;
	}

	if ((scene.keys[scene.root.env.UP] || scene.keys[scene.root.env._UP]) && this.stats.fuel > 0){
		this.stats.fuel -= delta * 10;
		if (this.stats.fuel < 0){
			this.stats.fuel = 0;
		}
		this.acceleration = 20;
	} else {
		this.acceleration = 0;
	}

	if (scene.keys[scene.root.env.SPACE]){
		delete scene.keys[scene.root.env.SPACE];
		scene.root.planet.spawnWall(this.x, this.y + 1, Math.random() > 0.5 ? "W": "G");
	}

	if (scene.keys[scene.root.env.DEL]){
		delete scene.keys[scene.root.env.DEL];
        scene.root.kill(this)
        scene.root.explode('player', this) // Why explode in kill() doesn't work??? WTF?
	}

	if (scene.keys[scene.root.env.X]
            || scene.keys[scene.root.env._X]
            || scene.keys[scene.root.env.__X]){

		delete scene.keys[scene.root.env.X];
		delete scene.keys[scene.root.env._X];
		delete scene.keys[scene.root.env.__X];
		if (scene.statistic.turrets > 0){
			scene.statistic.turrets --;
			scene.attach(new Canon(this.x, this.y, scene));
		}
	}

 	if ((scene.keys[scene.root.env.DOWN] || scene.keys[scene.root.env._DOWN])
                && this.bombSpawnRate <= 0){
		if (scene.statistic.bombs > 0) {
			scene.statistic.bombs--;
			this.bombSpawnRate = _spawnRate;
			scene.attach(new Bomb(1000, this.x, this.y, scene));
		}
    }

	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);

    this.engine1.x = this.x+0.1
    this.engine1.y = this.y+0.8
    this.engine2.x = this.x+0.9
    this.engine2.y = this.y+0.8
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
    // turn off the engines!
    scene.root._killNode(this.engine1)
    scene.root._killNode(this.engine2)
    // blow!!!
    scene.root.explode('player', this)
    scene.root.killNearbyNodes(this.x, this.y, 3)
    scene.root.planet.kill(this.x, this.y, 2)
};
