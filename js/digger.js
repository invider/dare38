var Digger = function(params) {
	var x = params.x || 0
	var y = Y(params.y || 0)
	var tiles = params.tiles
	return {
		evolve : function(delta) {
			y.move(delta).bound(0, 200);
		},
		render : function(ctx) {
		}
	}
}