var BombStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2
    this.wait = 0
    this.delay = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-5'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(BombStation, RefillStation);

BombStation.prototype.refill = function(scene){
    if (scene.statistic.bombs < scene.statistic.maxBombs) {
        scene.statistic.bombs++
        var msg = new FloatingText(this.x+1, this.y-1,
                "+1 bomb", "#FF0030", "1px alien", "absolute")
        msg.dx = 1
        msg.dy = -1
        msg.lifespan = 5
        msg.fadespan = 2
        msg.shaddow = false
        scene.root.effect.attach(msg) 
        scene.sfx('pickup-bomb')
    }
}
