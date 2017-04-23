var Digger = function(x, y, planet) {
	var p = Util.point(x, y);

	return {
		x:x,
		y:y,
		type:"Digger",
		evolve : function(delta, scene) {
			Util.fall(p, delta);
			var wall = planet.bumpToWall(p)
			if (wall && wall.stroke) {
				wall.stroke(1);
			}
			this.x = p.x;
			this.y = p.y;
			//
			//	FIXME: this is not working yet
			//
			Util.killOnlyPlayer(scene, this.x, this.y);
		},

		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x - 0.5, p.y - 0.5, 1, 1)
			ctx.fillStyle = 'cyan'
			ctx.fill()
		}
	}
}
