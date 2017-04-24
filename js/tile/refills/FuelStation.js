var FuelStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['soil-wired'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(FuelStation, RefillStation);

FuelStation.prototype.refill = function(scene){
    scene.root.player.stats.fuel = scene.root.player.stats.maxFuel
};