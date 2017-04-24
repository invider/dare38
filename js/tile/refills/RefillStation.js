var RefillStation = function () {
    EmptySpace.call(this);
    this.hp = 1000;
    this.radius = 2

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
                this.refill(scene);
            }
    };
};

Util.extend(RefillStation, EmptySpace);

RefillStation.prototype.refill = function(scene){

}