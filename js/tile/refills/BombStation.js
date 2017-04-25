var BombStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-5'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(BombStation, RefillStation);

BombStation.prototype.refill = function(scene){
    scene.statistic.bombs = scene.statistic.maxBombs;
}
