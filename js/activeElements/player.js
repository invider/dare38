
var _bombSpawnRate = 2.0;
var _jetpackOverheatTime = 2;
var _decreasOverheatVal = 0.02;
var _decreasIfOverheatedVal = 0.01;
var _varEngineForce = 300
var _minEngineForce = 10
var _varExhaustLevel = 0.25
var _fuelBurnRate = 4


var Player = function(x, y, scene) {
	ActiveElement.call(this, x, y, scene, [ scene.res.img['jet-man'] ], 100);
	this.bombSpawnRate = 0.0;

	this.type = "Player";
    this.stats = {
        fuel: 100,
		maxFuel: 100,
        overheat:0.0,
    	isOverheated:false
	}
    this.engine1 = new Explosion(x, y+0.8, -1, 1,
        false, 0.1, 0, 0.8, 0.2,
        Math.PI/2-Math.PI/16, Math.PI/8, 1, 0.5)
    this.engine2 = new Explosion(x+0.9, y+0.8, -1, 1,
        false, 0.1, 0, 0.8, 0.2,
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
        if (this.horzAcceleration === 0) this.scene.sfx('vengine', 0.2)
		this.horzAcceleration = 17;
    } else if (scene.keys[scene.root.env.LEFT] || scene.keys[scene.root.env._LEFT]){
        if (this.horzAcceleration === 0) this.scene.sfx('vengine', 0.2)
		this.horzAcceleration = - 17;
	} else {
		this.horzAcceleration = 0;
	}

	if ((scene.keys[scene.root.env.UP] || scene.keys[scene.root.env._UP]) && this.stats.fuel > 0 && !this.stats.isOverheated){
    	this.stats.overheat += delta;
		this.stats.fuel -= delta * _fuelBurnRate;
		if (this.stats.fuel < 0){
			this.stats.fuel = 0;
		}

        if (this.acceleration == 0 && !this.stats.isOverheated) {
            this.scene.sfx('engine', 0.2)
        }
		this.acceleration = 20;
		if (this.stats.overheat > _jetpackOverheatTime){
			this.stats.isOverheated = true;
		}
	} else {

    	if (this.stats.isOverheated){
    		this.stats.overheat -= _decreasIfOverheatedVal;
		} else {
            this.stats.overheat -= _decreasOverheatVal;
		}
        if (this.stats.overheat < 0){
            this.stats.overheat = 0;
            this.stats.isOverheated = false;
        }

		this.acceleration = 0;
	}

	if (scene.keys[scene.root.env.SPACE] && scene.statistic.walls > 0){
		delete scene.keys[scene.root.env.SPACE];
		scene.statistic.walls --;
		var wall = scene.root.planet.spawnWall(this.x, this.y + 1, "0");
        scene.root.explode('construct', wall)
	}

	if (scene.keys[scene.root.env.DEL]){
		delete scene.keys[scene.root.env.DEL];
        scene.root.kill(this)
        scene.root.explode('player', this) // Why explode in kill() doesn't work??? WTF?
	}

	if (scene.keys[scene.root.env.X]
            || scene.keys[scene.root.env._X]
            || scene.keys[scene.root.env.__X]
            || scene.keys[scene.root.env.SHIFT]){

		delete scene.keys[scene.root.env.X];
		delete scene.keys[scene.root.env._X];
		delete scene.keys[scene.root.env.__X];
		delete scene.keys[scene.root.env.SHIFT];
		if (scene.statistic.turrets > 0){
			scene.statistic.turrets --;
			scene.attach(new Canon(this.x, this.y, scene));
            scene.sfx('robot-1', 0.3)
		}
	}

 	if ((scene.keys[scene.root.env.DOWN] || scene.keys[scene.root.env._DOWN])
                && this.bombSpawnRate <= 0){
		if (scene.statistic.bombs > 0) {
			scene.statistic.bombs--;
			this.bombSpawnRate = _bombSpawnRate;
			scene.attach(new Bomb(1000, this.x, this.y, scene));
            scene.sfx('bomb-drop', 0.3)
		}
    }

	scene.physics.clearEvents();
	scene.physics.evolve(this, delta);

    // fix engines
    this.engine1.x = this.x+0.1
    this.engine1.y = this.y+0.8
    this.engine2.x = this.x+0.9
    this.engine2.y = this.y+0.8
    // update exhaust color depending on overheat
    var heat = 255
    if (this.stats.isOverheated) {
        heat = 0
    } if (this.stats.overheat > 0) {
        heat = Math.floor((1-this.stats.overheat/_jetpackOverheatTime) * 255)
    }
    this.engine1.color = "rgb(255,"+ heat + ",0)"
    this.engine2.color = "rgb(255,"+ heat + ",0)"
    // update exhaust depending on fuel
    var e = this.stats.fuel/this.stats.maxFuel
    var exhaust = 1 / (_minEngineForce + _varEngineForce)
    if (e < _varExhaustLevel) {
        var exhaust = 1/(_minEngineForce + ((this.stats.fuel/this.stats.maxFuel)/_varExhaustLevel) * _varEngineForce)
    }
    this.engine1.frequency = exhaust
    this.engine2.frequency = exhaust
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
    scene.root.planet.hit(this.x, this.y, 3, 100000000)
	scene.root.player = false;
    // no more goodies!
    this.scene.statistic.walls = 0
    this.scene.statistic.bombs = 0
    this.scene.statistic.turrets = 0
};
