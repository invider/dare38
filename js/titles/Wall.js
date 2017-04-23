var Wall = function () {
    PlanetElement.call(this);
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
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };
};

Util.extend(Wall, PlanetElement);