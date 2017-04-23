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
        ctx.drawImage(scene.res.img['stone-3.cybermold'],this.x,this.y, this.width, this.height);
    };

};

Util.extend(BaseNode, Wall);
