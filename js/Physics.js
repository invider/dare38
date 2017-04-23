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

Physics.prototype.checkConstraints = function(point, delta){
    point.horzVelocity += point.horzAcceleration * delta;
    if (point.horzVelocity != 0){
        if (point.horzVelocity > 0){
            var dir = DIRECTIONS.RIGHT;
        } else {
            var dir = DIRECTIONS.LEFT;
        }
        var horz = Collisions.findCollidedElementInDirection(this.scene, point.x, point.y, dir);
        if (horz){
            point.horzVelocity = 0;
            point.horzAcceleration = 0;
            if (dir == DIRECTIONS.RIGHT){
                point.x = horz.x - 1;
            } else {
                point.x = horz.x + 1;
            }
            this.horzWallFn && this.horzWallFn(horz);
        }
    }

    point.velocity += (this.gravity - point.acceleration) * delta;
    if (point.velocity != 0){
        if (point.velocity > 0){
            var dir = DIRECTIONS.DOWN;
        } else {
            var dir = DIRECTIONS.UP;
        }
        var vert = Collisions.findCollidedElementInDirection(this.scene, point.x, point.y, dir);
        if (vert){
            point.velocity = 0;
            point.acceleration = 0;
            if (dir == DIRECTIONS.DOWN){
                point.y = vert.y - 1;
            } else {
                point.y = vert.y + 1;
            }

            this.wallFn && this.wallFn(vert);
        }
    }
};

Physics.prototype.evolve = function(point, delta){
    this.checkConstraints(point, delta);
    point.y += point.velocity * delta;
    point.x += point.horzVelocity * delta;
};


