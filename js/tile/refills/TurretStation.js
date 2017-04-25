var TurretStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-2'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(TurretStation, RefillStation);

TurretStation.prototype.refill = function(scene){
    scene.statistic.turrets = scene.statistic.maxTurrets;
}
