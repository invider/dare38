/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {

        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        this.planet.init(this, scene);
        scene.attach(Digger(20, 20));
        scene.attach(_wonderer);
    },

    evolve: function(delta, scene) {
        this.planet.evolve(delta, scene);
        Util.evolveChildren(this.entity, delta, scene);
    },

    render: function(ctx, scene) {
        this.background.render(ctx, scene)
        this.planet.render(ctx, scene);
        Util.renderChildren(this.entity, ctx, scene);
    }
};
