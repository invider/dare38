/** @type Entity */
var _$root = {
    entity: [],

    init: function(parent, scene) {
        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        this.planet.init(this, scene);
        if (this.planet) scene.statusLine = 'planet defined'
        else scene.statusLine = 'No Planet!!!'
        scene.attach(Digger(15.2, 3, this.planet));
        scene.attach(Digger(2.2, 1.4, this.planet));
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
