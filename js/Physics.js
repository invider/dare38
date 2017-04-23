/**
 * Created by shaddy on 23.04.17.
 */
var AIR_FRICTION = 0.5;

var airFrictionAcceleration = function(velocity) {
  return AIR_FRICTION * velocity;
}
	
var Physics = function() {

};

Physics.prototype.init = function(scene){
    this.gravity = 9.8;
    this.scene = scene;
};

Physics.prototype.clearEvents = function(){
    this.wallFn = false;
    this.horzWallFn = false;
};
Physics.prototype.onWall = function(fn){
    this.wallFn = fn;
};

Physics.prototype.onHorzWall = function(fn){
    this.horzWallFn = fn;
};

Physics.prototype.checkConstraints = function(element, delta){

    if (element.horzVelocity != 0){
        if (element.horzVelocity > 0){
            var dir = DIRECTIONS.RIGHT;
        } else {
            var dir = DIRECTIONS.LEFT;
        }
        var horz = Collisions.findCollidedElementInDirection(this.scene, element.x, element.y, dir);
        if (horz){
            element.horzVelocity = 0;
            element.horzAcceleration = 0;
            if (dir == DIRECTIONS.RIGHT){
                element.x = horz.x - 1;
            } else {
                element.x = horz.x + 1;
            }
            this.horzWallFn && this.horzWallFn(horz);
        }
    }

    if (element.velocity != 0){
        if (element.velocity > 0){
            var dir = DIRECTIONS.DOWN;
        } else {
            var dir = DIRECTIONS.UP;
        }
        var vert = Collisions.findCollidedElementInDirection(this.scene, element.x, element.y, dir);
        if (vert){
            element.velocity = 0;
            element.acceleration = 0;
            if (dir == DIRECTIONS.DOWN){
                element.y = vert.y - 1;
            } else {
                element.y = vert.y + 1;
            }

            this.wallFn && this.wallFn(vert);
        }
    }
};

Physics.prototype.evolve = function(element, delta){
	var vx0 = element.horzVelocity 
	var vy0 = element.velocity 
    element.horzVelocity += (element.horzAcceleration - airFrictionAcceleration(vx0)) * delta;
    element.velocity += (this.gravity - element.acceleration - airFrictionAcceleration(vy0)) * delta;
    this.checkConstraints(element, delta);
    element.y += 0.5 * (vy0 + element.velocity) * delta;
    element.x += 0.5 * (vx0 + element.horzVelocity) * delta;
};


Physics.prototype.accelerateToMaxHorzSpeed = function(element, acceleration, maxV) {
    var v = Math.abs(element.horzVelocity);
	element.horzAcceleration = v >= maxV ? airFrictionAcceleration(element.horzVelocity) : acceleration; 
};