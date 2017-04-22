/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {
        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        this.planet.init(this, scene);
        scene.attach(Digger(20, 40, this.planet))
        scene.attach(_wonderer);
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
        ctx.scale(scaleFactor, scaleFactor)

        this.planet.render(ctx, scene);
        Util.renderChildren(this.entity, ctx, scene);

        // transform back to origins
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
};
