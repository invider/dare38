/** @type Entity */
var _$root = {
    entity: [],
    player: false,

    init: function(parent, scene) {
        // Create the World!
        this.env = _$env
        this.background = _background;
        this.planet = _Planet;
        this.scene = scene;
        this.planet.init(this, scene);
        this.evilSource = _evilSource;
        this.effect = new LayerNode()
        this.title = new LayerNode()
        this.player = false;
        // fix scene size based on the planet
        scene.width = this.planet.xSize
        scene.height = this.planet.ySize

        // game over tag
        this.gameOverTag = new FloatingText(0, -100,
                "Game Over", "#C02030", "64px alien", "center")
        this.gameOverTag.render = function(ctx, scene) {
            if (!scene.gameoverFlag) return;
            FloatingText.prototype.render.call(this, ctx, scene)
        }
        this.title.attach(this.gameOverTag)
    },

    explode: function(type, src) {
        switch(type) {
        case 'wall':
            this.effect.attach(new Explosion(src.x+0.5, src.y+0.5, 0.1, 1500,
                    scene.res.img['particle-white'], 0.4, 0.4, 0.7, 0.5,
                    0, Math.PI*2,
                    0.5, 0.5))
            break;
        case 'bomb':
            this.effect.attach(new Explosion(src.x+0.5, src.y+0.5, 0.2, 1000,
                  this.scene.res.img['particle-white'], 2, 1, 0.5, 0,
                  0, Math.PI*2,
                  0.5, 2))
            break;
        case 'player':
            this.effect.attach(new Explosion(src.x+0.5, src.y+0.5, 0.2, 1500,
                  this.scene.res.img['particle-red'], 2, 1, 1, 0.5,
                  0, Math.PI*2,
                  0.5, 0.5))
            break;
        case 'digger':
            this.effect.attach(new Explosion(src.x+0.5, src.y+0.5, 0.2, 1500,
                  this.scene.res.img['particle-cyan'], 2, 1, 1, 0.5,
                  0, Math.PI*2,
                  0.5, 0.5))
            break;
        case 'gun':
            this.effect.attach(new Explosion(src.x+0.5, src.y+0.5, 0.2, 1500,
                  this.scene.res.img['particle-blue'], 2, 1, 1, 0.5,
                  0, Math.PI*2,
                  0.5, 0.5))
            break;
        }
    },
    
    spawnPlayer: function(){
        if (this.scene.statistic.lifes > 0 && !this.scene.gameoverFlag){
            this.scene.statistic.lifes --;
            var spawnPoint = this.planet.getSpawnPoint();
            this.player = new Player(spawnPoint.x, spawnPoint.y, this.scene);
            this.entity.push(this.player);
        } else {
            this.scene.gameOver();
        }
    },

    evolve: function(delta, scene) {
        if (scene.keys[27]){
            delete scene.keys[27];
            scene.gameRestart();
        }
        if (!this.player){
            this.spawnPlayer();
        }
        this.evilSource.evolve(delta, scene)
        this.planet.evolve(delta, scene);
        Util.evolveChildren(this.entity, delta, scene);
        this.effect.evolve(delta, scene)
        this.title.evolve(delta, scene)

        scene.statusLine = this.scene.statistic.toString();
        scene.checkCompletion();
    },

    _killNode: function(node){
        //
        //  TODO: optimize this
        //
        var counter = 0;
        while (counter < this.entity.length){
            if (this.entity[counter] == node){
                this.entity.splice(counter, 1);
                counter --;
                if (node.kill) node.kill();
            }
            counter ++;
        }
    },
    killNearbyNodes: function(x, y, r, filter){
        var my = this;
        filter = filter || function(){ return true; };
        this.getNearbyNodes(x,y,r)
            .filter(filter)
            .forEach(function(node){
                my.kill(node)
            });
    },
    /**
     * returns nodelist of nodes in given raduis
     * NOTE: this is only active nodes
     * @param x
     * @param y
     * @param r - radius to detect
     */
    getNearbyNodes: function(x, y, r){
        r = r || 0.5;
        var res = [];
        for (var i=0; i < this.entity.length; i++){
            if (Math.sqrt(Math.pow(x - this.entity[i].x, 2) + Math.pow(y - this.entity[i].y, 2)) <= r){
                res.push(this.entity[i]);
            }
        }
        return res;
    },
    /**
     * kills only active units on coordinates
     * @param toKill
     */
    kill:function(toKill){
        if (!(toKill instanceof Array)){
            toKill = [toKill];
        }
        //
        //  TODO: fix and optimize this
        //
        for (var i=0; i < toKill.length; i++){
            this._killNode(toKill[i]);
        }
    },
    portalKilled: function(){
        this.scene.gameOver();
    },
    render: function(ctx, scene) {
        this.background.render(ctx, scene)

        // translate to camera view
        var wFactor = scene.screenWidth / scene.width
        var hFactor = scene.screenHeight / scene.height
        var scaleFactor = Math.min(wFactor, hFactor)
        var verticalEdge =  scene.screenHeight - (scene.height * scaleFactor)
        var horizontalEdge = scene.screenWidth - (scene.width * scaleFactor)
        ctx.translate(horizontalEdge/2,verticalEdge/2)
        ctx.scale(scaleFactor, scaleFactor);
        this.planet.render(ctx, scene);
        Util.renderChildren(this.entity, ctx, scene);

        // draw effects
        this.effect.render(ctx, scene)

        // transform back to origins
        ctx.setTransform(1, 0, 0, 1, 0, 0)

        // draw titles
        this.title.render(ctx, scene)
    }
};
