var Digger = function(x, y, planet) {
	
	var w = 1;
	var hw = w / 2;
	var p = Util.point(x, y)
	
	return {
		evolve : function(delta, scene) {
			Util.fall(p, delta)
			var y = Math.ceil(p.y)
			var x1 = Math.floor(p.x - hw)
			var x2 = Math.floor(p.x + hw)
			var elem = planet.getElement(x1, y)
			if(elem instanceof EmptySpace) {
				elem = planet.getElement(x2, y)
			}
			if(Util.boundY(p, y - 1, y - hw + (elem instanceof EmptySpace ? 1 : 0))) {
				if(elem.stroke) {
					elem.stroke(1);
				}
			}
		},
		
		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x - hw, p.y - hw, w, w)
			ctx.fillStyle = 'green'
			ctx.fill()
		},
	}
}