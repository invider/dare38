var FuelStation = function () {
    RefillStation.call(this);
    this.hp = 1000;
    this.radius = 2
    this.delay = 1.5

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['door-4'],this.x, this.y, this.width, this.height);
    };
};

Util.extend(FuelStation, RefillStation);

FuelStation.prototype.refill = function(scene){
    if (scene.root.player.stats.fuel === scene.root.player.stats.maxFuel) return

    scene.root.player.stats.fuel += 5
    if (scene.root.player.stats.fuel > scene.root.player.stats.maxFuel) {
        scene.root.player.stats.fuel = scene.root.player.stats.maxFuel
    }

    var msg = new FloatingText(this.x+1, this.y-1,
            "+5 fuel", "#FFFF00", "1px alien", "absolute")
    msg.dx = 1.5
    msg.dy = -1.5
    msg.lifespan = 4
    msg.fadespan = 2
    msg.shaddow = false
    scene.root.effect.attach(msg) 
    scene.sfx('pickup-fuel')
};
