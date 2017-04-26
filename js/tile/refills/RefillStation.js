var RefillStation = function () {
    EmptySpace.call(this);
    this.hp = 1000;
    this.radius = 2
    this.wait = 0
    this.delay = 1

    /**
     * @param delda {number}
     * @param scene {scene}
     */
    this.evolve=function(delta, scene) {
        this.wait -= delta
        if (this.wait <= 0) {
            if ( scene.root.player &&
                Util.getLength(
                    scene.root.player.x,
                    scene.root.player.y,
                    this.x,
                    this.y
                ) <= this.radius){
                    this.refill(scene);
                    this.wait = this.delay
            }
        }
    };
};

Util.extend(RefillStation, EmptySpace);

RefillStation.prototype.refill = function(scene){

}
