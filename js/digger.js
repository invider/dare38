var Digger = function(x, y, planet) {
	var p = Util.point(x, y);

	return {
		x:x,
		y:y,
		hit: 100,
		type:"Digger",
		evolve : function(delta, scene) {
			this.x = p.x;
			this.y = p.y;
			var killWall = function(wall){
				wall.stroke(delta * 100);
			};
			scene.physics.clearEvents();
			scene.physics.onWall(killWall);
			scene.physics.onHorzWall(killWall);
			scene.physics.evolve(p, delta);

			//
			//	FIXME: this is not working yet
			//
			Util.killOnlyPlayer(scene, this.x, this.y);
		},

		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x, p.y, 1, 1)
			ctx.fillStyle = 'cyan'
			ctx.fill()
		}
	}
}
