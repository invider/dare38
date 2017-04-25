var WallStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-3'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(WallStation, RefillStation);

WallStation.prototype.refill = function(scene){
    scene.statistic.walls = scene.statistic.maxWalls;
}
