var Wall = function (type) {
    PlanetElement.call(this);
    this.type = type
    
    switch(type) {
    case 'X': this.hp = 400; break;
    case '0': this.hp = 500; break;
    case 'g': this.hp = 100; break;
    case 'G': this.hp = 100; break;
    case 'D': this.hp = 100; break;
    case 'I': this.hp = 250; break;
    case 'S': this.hp = 100; break;
    case 'A': this.hp = 100; break;
    case 'W': this.hp = 100; break;
    case 'Q': this.hp = 300; break;
    case 's': this.hp = 100; break;
    case 'a': this.hp = 100; break;
    case 'd': this.hp = 100; break;
    case 'z': this.hp = 100; break;
    case 'x': this.hp = 100; break;
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
        case'0':
            ctx.drawImage(scene.res.img['stone-3'],this.x,this.y, this.width, this.height);
            break;
        case 'g':
            ctx.drawImage(scene.res.img['grass'],this.x,this.y, this.width, this.height);
            break;
        case 'G':
            ctx.drawImage(scene.res.img['grass-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'D':
            ctx.drawImage(scene.res.img['dirt-grass-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'I':
            ctx.drawImage(scene.res.img['ice-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'S':
            ctx.drawImage(scene.res.img['sand-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'A':
            ctx.drawImage(scene.res.img['grassy-sand-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'W':
            ctx.drawImage(scene.res.img['snow-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'Q':
            ctx.drawImage(scene.res.img['grassy-snow-mono'],this.x,this.y, this.width, this.height);
            break;
        case 's':
            ctx.drawImage(scene.res.img['soil-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'a':
            ctx.drawImage(scene.res.img['grassy-soil-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'd':
            ctx.drawImage(scene.res.img['grassy-soil-2-mono'],this.x,this.y, this.width, this.height);
            break;
        case 'z':
            ctx.drawImage(scene.res.img['soil-1.mold'],this.x,this.y, this.width, this.height);
            break;
        case 'x':
            ctx.drawImage(scene.res.img['soil-1'],this.x,this.y, this.width, this.height);
            break;


        default:
            ctx.drawImage(scene.res.img['stone-2'],this.x,this.y, this.width, this.height);
            break;
        }
    };
};

Util.extend(Wall, PlanetElement);
