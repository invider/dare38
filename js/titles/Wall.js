var Wall = function () {
    PlanetElement.call(this);
    this.hp = 100;
    this.init = function (parentNode, scene) {
        this.scene = scene;
    };

    this.evolve = function (delta, scene) {

    };

    this.stroke = function(v){
        this.hp -= v;
        console.log("Ooooh, you have broke the wall, so what you are going to do in neibouring cell?");
        this.scene.root.planet.removeNode(this);
        Util.playSound("WallBroken");
        return this.hp >= 0;
    };

    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };
};

Util.extend(Wall, PlanetElement);