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
    y: function(y, v0) {
    	var x = y || 0 
    	var v = v0 || 0
    	return {
    		move: function(delta) {
    			x += v * delta
    			v += 9.8 * delta
    			return this;
    		},
    		bound: function(a, b) {
    			if(x < Math.min(a, b)) {
    				x = Math.min(a, b);
    				v = 0
    			} else if(x > Math.max(a, b)) {
    				x = Math.max(a, b);
    				v = 0
    			}
    			return this;
    		},
    		value: function() {
    			return x;
    		}
    	}
    }
};