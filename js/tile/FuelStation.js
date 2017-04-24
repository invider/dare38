var FuelStation = function () {
    EmptySpace.call(this);
    this.hp = 1000;
    this.radius = 2

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['soil-wired'],this.x, this.y, this.width, this.height);
    };
    /**
     * @param delda {number}
     * @param scene {scene}
     */
    this.evolve=function(delta, scene) {
        if ( scene.root.player &&
            Util.getLength(
                scene.root.player.x,
                scene.root.player.y,
                this.x,
                this.y
            ) <= this.radius){
                scene.root.player.stats.fuel = scene.root.player.stats.maxFuel
            }
    };
};

Util.extend(FuelStation, EmptySpace);
