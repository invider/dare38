/**
 * Created by shaddy on 22.04.17.
 */
var Util = {
    renderChildren: function(obj, ctx, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].render.call(ctx, scene);
        }
    },
    evolveChildren: function(obj, delta, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].evolve.call(delta, scene);
        }
    },
    point: function(x0, y0, v0) {
    	return {
    		x: x0 || 0,
    		y: y0 || 0,
    		v: v0 || 0
    	}
    },
    fall: function(point, delta) {
    	point.y += point.v * delta;
    	point.v += 9.8 * delta;
    },
    boundY: function(point, a, b) {
		if(point.y < Math.min(a, b)) {
			point.y = Math.min(a, b);
			point.v = 0
		} else if(point.y > Math.max(a, b)) {
			point.y = Math.max(a, b);
			point.v = 0
		}
    }
};