/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {

        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        scene.attach(Digger(20, 40, this.planet));
        scene.attach(_wonderer);
        this.planet.init(this, scene);
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
