var Digger = function(x, y) {
	var coord = Utils.point(x, y)
	return {
		evolve : function(delta) {
			Utils.fall(point, delta);
			Utils.boundY(point, 0, 200);
		},
		render : function(ctx) {
		}
	}
}