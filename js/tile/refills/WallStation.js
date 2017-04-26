var WallStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2
    this.delay = 0.5

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-3'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(WallStation, RefillStation);

WallStation.prototype.refill = function(scene){
    if (scene.statistic.walls < scene.statistic.maxWalls) {
        scene.statistic.walls++
        scene.sfx('refill')
    }
}
