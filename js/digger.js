var Digger = function(x, y) {
	
	var p = Util.point(x, y)
	
	return {
		evolve : function(delta, scene) {
			Util.fall(p, delta);
			Util.boundY(p, 0, 300);//scene.height);
		},
		
		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x-5, p.y-5, 10, 10)
			ctx.fillStyle = 'green'
			ctx.fill()
		},
	}
}