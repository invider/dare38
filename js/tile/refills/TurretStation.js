var TurretStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2
    this.wait = 0
    this.delay = 1

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-2'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(TurretStation, RefillStation);

TurretStation.prototype.refill = function(scene){
    if (scene.statistic.turrets < scene.statistic.maxTurrets) {
        scene.statistic.turrets++
        var msg = new FloatingText(this.x+1, this.y-1,
                "+1 turret", "#FF00FF", "1px alien", "absolute")
        msg.dx = 1.5
        msg.dy = -1.5
        msg.lifespan = 4
        msg.fadespan = 2
        msg.shaddow = false
        scene.root.effect.attach(msg) 
        scene.sfx('refill')
    }
}
