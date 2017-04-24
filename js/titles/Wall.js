var Wall = function (type) {
    PlanetElement.call(this);
    this.type = type
    
    switch(type) {
    case 'X': this.hp = 250; break;
    case 'G': this.hp = 50; break;
    }

    this.hit = function(v){
        this.hp -= v;
        if (this.hp >= 0){
            return true;
        }
        this.scene.root.planet.removeNode(this);
        this.scene.root.explode('wall', this);
        return false;
    };

    this.render = function (ctx, scene) {
        switch(this.type) {
        case'X':
            ctx.drawImage(scene.res.img['stone-2'],this.x,this.y, this.width, this.height);
            break;
        case 'G':
            ctx.drawImage(scene.res.img['grass-mono'],this.x,this.y, this.width, this.height);
            break;
        default:
            ctx.drawImage(scene.res.img['stone-2'],this.x,this.y, this.width, this.height);
            break;
        }
    };
};

Util.extend(Wall, PlanetElement);
