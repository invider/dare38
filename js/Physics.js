/**
 * Created by shaddy on 23.04.17.
 */
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
    element.horzVelocity += element.horzAcceleration * delta;
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

    element.velocity += (this.gravity - element.acceleration) * delta;
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
    this.checkConstraints(element, delta);
    element.y += element.velocity * delta;
    element.x += element.horzVelocity * delta;
};

