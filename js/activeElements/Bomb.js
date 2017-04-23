/**
 * Created by Timur on 22.04.2017.
 */

var Bomb = function(ms, x, y, scene) {
    ActiveElement.call(this, x, y, scene, [ scene.res.img['ice-mono'] ], 100);
    this.counter = ms / 1000.0;
    this.type = "Bomb";
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
    // ctx.drawImage(scene.res.img['ice-mono'],this.x,this.y, 1, 1);
    //
    // ctx.beginPath();
    // ctx.fillStyle = "gray";
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fill();
};

Bomb.prototype.explode = function() {
    console.log("EXPLODE");
    scene.root.planet.kill(this.x, this.y, 2);
    scene.root.killNearbyNodes(this.x, this.y, 2)
    scene.root.planet.kill(this);
};

Util.extend(Bomb, PlanetElement);