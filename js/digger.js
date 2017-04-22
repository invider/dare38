var Digger = function(x, y, planet) {

	var w = 1;
	var hw = w / 2;
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
			ctx.rect(p.x - hw, p.y - hw, w, w)
			ctx.fillStyle = 'cyan'
			ctx.fill()
		},
	}
}
