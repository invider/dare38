var Digger = function(x, y) {
	
	var p = Util.point(x, y)
	
	return {
		evolve : function(delta, scene) {
			Util.fall(p, delta);
			Util.boundY(p, 0, scene.height);
		},
		
		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x, p.y, 5, 5)
			ctx.fillStyle = 'green'
			ctx.fill()
		},
	}
}