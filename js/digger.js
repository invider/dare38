var Digger = function(x, y) {
	
	var p = Util.point(x, y)
	
	return {
		evolve : function(delta) {
			Util.fall(p, delta);
			Util.boundY(p, 0, 200);
		},
		
		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x, p.y, 5, 5)
			ctx.fillStyle = 'green'
			ctx.fill()
		},
	}
}