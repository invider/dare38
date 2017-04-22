var Digger = function(x, y) {
	var p = Utils.point(x, y)
	return {
		evolve : function(delta) {
			Utils.fall(p, delta);
			Utils.boundY(p, 0, 200);
		},
		render : function(ctx) {
		},
	}
}