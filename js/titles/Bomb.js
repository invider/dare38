/**
 * Created by Timur on 22.04.2017.
 */
var Bomb =  function(ms, pos) {
    PlanetElement.call(this);
    this.counter = ms / 1000.0;
    this.x = pos.x;
    this.y = pos.y;

    this.evolve=function(delta, scene) {
        console.log("this.counter " + this.counter + " " + this.x + " " + this.y);
        this.counter -= delta;
        if(this.counter <= 0) {
            this.explode();
        }
    };

    this.render = function(ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };

    this.setup = function(ms, pos) {
        setInterval(this.explode, ms);
    };

    this.explode = function() {
        console.log("EXPLODE");
        scene.root.planet.kill(this.x, this.y, 2);
    }
};

Util.extend(Bomb, PlanetElement);