var Digger = function(x, y) {
	var p = Utils.point(x, y)
	return {
		evolve : function(delta) {
			Util.fall(p, delta);
			Util.boundY(p, 0, 200);
		},
		render : function(ctx) {
		},
	}
}