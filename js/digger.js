var Digger = function(x, y) {
	
	var p = Util.point(x, y)
	var w=10;
	
	return {
		evolve : function(delta, scene) {
			Util.fall(p, delta);
			Util.boundY(p, 0, scene.height-w);
		},
		
		render : function(ctx) {
			ctx.beginPath()
			ctx.rect(p.x-w/2, p.y-w/2, w,w)
			ctx.fillStyle = 'green'
			ctx.fill()
		},
	}
}