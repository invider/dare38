/**
 * Created by shaddy on 23.04.17.
 */
var ActiveElement = function(x, y, scene){
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.horzVelocity = 0;
    this.w = 1;
    this.h = 1;
    this.acceleration = 0;
    this.horzAcceleration = 0;
    this.scene = scene;
};

ActiveElement.prototype.init = function(){

};

ActiveElement.prototype.kill = function(){

};

ActiveElement.prototype.evolve = function(delta, scene){

};

ActiveElement.prototype.render = function(ctx){

};

