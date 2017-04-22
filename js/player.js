var Player = function(x, y, planet) {

	var p = Util.point(x, y)

	return {
		x:x,
		y:y,
		type:"Player",
		evolve : function(delta, scene) {
			if (scene.keys[39]){
				p.x += delta;
			}
			if (scene.keys[37]){
				p.x -= delta;
			}
			var elem = planet.gravitate(p, delta)
			// if (elem && elem.stroke) {
			// 	elem.stroke(1);
			// }
			this.x = p.x;
			this.y = p.y;
		},

		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x - 0.5, p.y - 0.5, 1, 1)
			ctx.fillStyle = '#e60073'
			ctx.fill()
		}
	}
}
