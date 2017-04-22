/**
 * Created by shaddy on 22.04.17.
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() { };
        F.prototype = o;
        return new F();
    };
}
var Util = {
    initChildren: function(obj, parent, scene){
        for (var i=0; i < obj.length; i++){
            obj[i].init.call(obj[i], parent, scene);
        }
    },

    extend: function(child, parent) {
        child.func = {};
        // extends prototype
        if (child.__extended) {
            for ( var k in parent.prototype) {
                child.prototype[k] = parent.prototype[k];
            }
        } else {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
            child.__extended = true;
            child.superClass = parent;
        }
        return child.prototype;
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
    	var dv = 9.8 * delta;
    	point.y += point.v * delta + 0.5 * dv * delta;
    	point.v += dv;
    },
    
    boundX: function(point, a, b) {
		if(point.x < Math.min(a, b)) {
			point.x = Math.min(a, b);
			return true
		} else if(point.x > Math.max(a, b)) {
			point.x = Math.max(a, b);
			return true
		}
		return false
    },
    
    boundY: function(point, a, b) {
		if(point.y < Math.min(a, b)) {
			point.y = Math.min(a, b);
			point.v = 0
			return true
		} else if(point.y > Math.max(a, b)) {
			point.y = Math.max(a, b);
			point.v = 0
			return true
		}
		return false
    }
};