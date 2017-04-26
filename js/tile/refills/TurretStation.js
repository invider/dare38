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
        scene.sfx('refill')
    }
}
