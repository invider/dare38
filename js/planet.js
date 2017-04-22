/**
 * Created by shaddy on 22.04.17.
 */

var PlanetProto = function() {
    this.x = 0;
    this.y = 0;
    this.children = [];
    this.init = function(parentNode, scene){
        this.parentNode = parentNode;
        this.scene = scene;
    };
    this.evolve=function(delta, scene) {
        //none done here

    };

    this.render = function(ctx, scene) {
        //planet drawing
        //ctx.strokeStyle="red";
        //ctx.rect(this.x,this.y,40,40);
        //ctx.stroke();

    }
};