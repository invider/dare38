var Digger = function(x, y, planet) {
	
	var w = 1;
	var hw = w / 2;
	var p = Util.point(x, y)
	
	return {
		evolve : function(delta, scene) {
			Util.fall(p, delta)
			var y = Math.ceil(p.y)
			var elem = planet.findWallBelow(p.x - hw, p.x + hw, p.y)
			if(Util.boundY(p, 0, y - hw + (elem ? 0 : 1))) {
				if(elem && elem.stroke) {
				    elem.stroke(1);
				}
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
