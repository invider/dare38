var BaseNode = function () {
    Wall.call(this);
    this.baseHp = 10000;
    this.hp = this.baseHp;
    this.colorP = 255;

    this.stroke = function(v){
        this.hp -= v;
        this.colorP = Math.floor(255 * (this.hp / this.baseHp));
        if (this.hp >= 0){
            return true;
        }
        console.log("Base destroyed!!!!");
        this.scene.root.planet.removeNode(this);
        Util.playSound("BaseHit");
        return false;
    };
    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, " + this.colorP + ")";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };

};

Util.extend(BaseNode, Wall);