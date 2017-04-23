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

    killAllButNotPlayer:function(scene, x, y){
        var nodes = scene.root.getNearbyNodes(x,y).filter(function(node){
            return node.type != "Player";
        });
        scene.root.kill(nodes);
    },
    killOnlyPlayer:function(scene, x, y){
        var nodes = scene.root.getNearbyNodes(x,y).filter(function(node){
            return node.type == "Player";
        });
        
        scene.root.kill(nodes);
    },
    playSound:function(audio){
        //var audio = new Audio("sound/" + audio + ".wav");
        //audio.play();
    },
    absToRounded: function(x){
        return Math.round(x);
    }

};