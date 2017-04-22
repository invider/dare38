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
     * @param r - radius to kill
     */
    killAll:function(x, y, r){
        r = r || 1;
        rgis.kill(x, y);
        this.scene.planet.kill(x, y, r);
    },
    /**
     * returns nodelist of nodes in given raduis
     * NOTE: this is only active nodes
     * @param x
     * @param y
     * @param r - radius to detect
     */
    getNearbyNodes: function(x, y, r){
        r = r || 1;
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
     * @param x
     * @param y
     * @param r - radius to kill
     */
    kill:function(x, y, r){
        //
        //  TODO: fix and optimize this
        //
        var toKill = this.getNearbyNodes(x,y,r);
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
