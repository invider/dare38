var Player = function(x, y, planet) {

	var p = Util.point(x, y)

	return {
		x:x,
		y:y,
		type:"Player",
		evolve : function(delta, scene) {
			this.x = p.x;
			this.y = p.y;
			if (scene.keys[39]){
				p.horzAcceleration = 3;
			} else if (scene.keys[37]){
				p.horzAcceleration = - 3;
			} else {
				p.horzAcceleration = 0;
			}
			scene.physics.clearEvents();
			scene.physics.evolve(p, delta);
		},

		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x, p.y, 1, 1)
			ctx.fillStyle = '#e60073'
			ctx.fill()
		}
	}
}
