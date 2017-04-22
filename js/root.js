/** @type Entity */
var _$root = {
    entity: [],

    init: function(parent, scene) {
        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        this.planet.init(this, scene);
        scene.attach(Digger(15.2, 3, this.planet));
        scene.attach(Digger(2.2, 1.4, this.planet));
        scene.attach(_wonderer);

        scene.width = this.planet.xSize
        scene.height = this.planet.ySize
    },

    evolve: function(delta, scene) {
        this.planet.evolve(delta, scene);
        Util.evolveChildren(this.entity, delta, scene);
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
