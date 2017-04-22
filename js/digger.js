var Digger = function(params) {
	var x = params.x || 0
	var y = Utils.y(params.y)
	var tiles = params.tiles
	return {
		evolve : function(delta) {
			y.move(delta).bound(0, 200);
		},
		render : function(ctx) {
		}
	}
}