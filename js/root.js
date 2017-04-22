/** @type Entity */
var _$root = {
    entity: [],

    init: function(parent, scene) {
        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        this.scene = scene;
        this.planet.init(this, scene);
        this.evilSource = _evilSource

        //scene.attach(Digger(15.2, 3, this.planet));
        //scene.attach(Digger(2.2, 1.4, this.planet));
        //scene.attach(_wonderer);

        // fix scene size based on the planet
        scene.width = this.planet.xSize
        scene.height = this.planet.ySize
    },

    evolve: function(delta, scene) {
        this.evilSource.evolve(delta, scene)
        this.planet.evolve(delta, scene);
        Util.evolveChildren(this.entity, delta, scene);
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
            }
            counter ++;
        }
    },
    /**
     * kills all units on coordinates, both root and planet
     * @param x
     * @param y
     */
    killAll:function(x,y){
        rgis.kill(x, y);
        this.scene.planet.kill(x, y);
    },
    /**
     * kills only active units on coordinates
     * @param x
     * @param y
     */
    kill:function(x, y){
        //
        //  TODO: fix and optimize this
        //
        var toKill = [];
        for (var i=0; i < this.entity.length; i++){
            if (Math.sqrt(Math.pow(x - this.entity[i].x, 2) + Math.pow(y - this.entity[i].y, 2)) <= 1){
                toKill.push(this.entity[i]);
            }
        }
        for (var i=0; i < toKill.length; i++){
            this._killNode(toKill[i]);
        }

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
        ctx.scale(scaleFactor, scaleFactor)

        this.planet.render(ctx, scene);
        Util.renderChildren(this.entity, ctx, scene);

        // transform back to origins
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
};
