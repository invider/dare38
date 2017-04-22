var Digger = function(params) {
	var x = Utils.point(params.x)
	var y = Utils.point(params.y)
	return {
		evolve : function(delta) {
			Utils.fall(point, delta);
			Utils.bound(point, 0, 200);
		},
		render : function(ctx) {
		}
	}
}