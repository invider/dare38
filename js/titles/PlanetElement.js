/**
 * Created by shaddy on 22.04.17.
 */
var PlanetElement = function(){
    this.x=1;
    this.y=1;
    this.width = 1;
    this.height = 1;
    this.init = function (parentNode, scene) {
        this.scene = scene;
    };

    this.evolve=function(delta, scene) {
    };

    this.render = function(ctx, scene) {
    };
};
