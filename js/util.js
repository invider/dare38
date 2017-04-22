/**
 * Created by shaddy on 22.04.17.
 */
var Util = {
    initChildren: function(obj, parent, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].init.call(obj[i], parent, scene);
        }
    },
    
    renderChildren: function(obj, ctx, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].render.call(obj[i], ctx, scene);
        }
    },
    
    evolveChildren: function(obj, delta, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].evolve.call(obj[i], delta, scene);
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
    
    boundX: function(point, a, b) {
		if(point.x < Math.min(a, b)) {
			point.x = Math.min(a, b);
		} else if(point.x > Math.max(a, b)) {
			point.x = Math.max(a, b);
		}
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