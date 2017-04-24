/**
 * Created by Timur on 22.04.2017.
 */

var Bomb = function(ms, x, y, scene) {
    ActiveElement.call(this, x, y, scene, [ scene.res.img['ice-mono'] ], 100);
    this.counter = ms / 1000.0;
    this.type = "Bomb";
    this.power = 100000000;
    this.r = 2;
};
Util.extend(Bomb, ActiveElement);

Bomb.prototype.evolve = function(delta, scene) {
    ActiveElement.prototype.evolve.call(this, delta, scene);
    this.counter -= delta;
    if(this.counter <= 0) {
        this.explode();
    }
    scene.physics.clearEvents();
    scene.physics.evolve(this, delta);
};

Bomb.prototype.render = function(ctx, scene) {
    ActiveElement.prototype.render.call(this, ctx, scene);
};

Bomb.prototype.explode = function() {
    scene.root.planet.hit(this.x, this.y, this.r, this.power);
    scene.root.killNearbyNodes(this.x, this.y, this.r)
    scene.root.planet.kill(this)
    scene.root.explode('bomb', this)
};

Util.extend(Bomb, PlanetElement);
