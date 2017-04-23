var Digger = function(x, y, scene) {
    ActiveElement.call(this, x, y, scene, [ scene.res.img['dig-man'], scene.res.img['jet-man'] ], 1000);

	this.type = "Digger";
	this.lastShot = new Date().getTime();
	this.shotInterval = 1000;
	this.hitPower = 50;
};
Util.extend(Digger, ActiveElement);

Digger.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);
    
	var location = this;
	var hitTimeout = function() {
		var time = new Date().getTime(); 
		if (time - location.lastShot > location.shotInterval){
			location.lastShot = time;
			return true;
		}
		return false;
	}
	
	var killWall = function(wall){
		if (hitTimeout()) {
			wall.hit(location.hitPower);
		}
	};
	
	var killCanon = function(canon) {
		location.horzAcceleration = 0;
		location.horzVelocity = 0;
		if (hitTimeout()) {
		  canon.hit(location.hitPower); 
		}
	};
	
	var closestTarget = function() {
		var cannons = scene.root.getNearbyNodes(location.x, location.y, 20).filter(function(node) {
			return node instanceof Canon;
		});
		cannons.push(scene.root.planet.getSpawnPoint());
		cannons = cannons.sort(function(a, b) {
			var a = Util.getLength(location.x, location.y, a.x, a.y);
			var b = Util.getLength(location.x, location.y, b.x, b.y);
			return a - b;
		});
		return cannons[0];
	};
	
	var dropped = function(wall) {
		var p = closestTarget();
		if(Util.getLength(location.x, location.y, p.x, p.y) < 0.5 && p instanceof Canon) {
			killCanon(p);
		} else {
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
	};
	
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
