var Wall = function (type) {
    PlanetElement.call(this);
    this.type = type
    this.hp = 100;

    this.stroke = function(v){
        this.hp -= v;
        if (this.hp >= 0){
            return true;
        }
        console.log("Ooooh, you have broke the wall, so what you are going to do in neibouring cell?");
        this.scene.root.planet.removeNode(this);
        Util.playSound("WallBroken");
        return false;
    };

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['stone-2'],this.x,this.y, this.width, this.height);
    };
};

Util.extend(Wall, PlanetElement);
