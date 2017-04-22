var Digger = function(x, y, planet) {

	var p = Util.point(x, y)

	return {
		evolve : function(delta, scene) {
			var elem = planet.gravitate(p, delta)
			if (elem && elem.stroke) {
				elem.stroke(1);
			}
		},

		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x - 0.5, p.y - 0.5, 1, 1)
			ctx.fillStyle = 'cyan'
			ctx.fill()
		},
	}
}
