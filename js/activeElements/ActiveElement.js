/**
 * Created by shaddy on 23.04.17.
 */
var ActiveElement = function(x, y, scene){
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.horzVelocity = 0;
    this.acceleration = 0;
    this.horzAcceleration = 0;
    this.scene = scene;
    this.type = "ActiveElement";
};

ActiveElement.prototype.init = function(){

};

ActiveElement.prototype.kill = function(){
    console.log(this + ": killed!");
};

ActiveElement.prototype.evolve = function(delta, scene){

};

ActiveElement.prototype.render = function(ctx){

};

ActiveElement.prototype.toString = function(){
    return "[" + this.type + " x:" + this.x + " y:" + this.y + "]";
}

