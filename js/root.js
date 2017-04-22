/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {

        // Create the World!
        this.background = _background;
        this.planet = _Planet;
        scene.attach(Digger(20, 20));
        scene.attach(_wonderer);
    },

    evolve: function(delta, scene) {
        Util.evolveChildren(this.entity, delta, scene);
    },

    render: function(ctx, scene) {
        this.background.render(ctx, scene)
        Util.renderChildren(this.entity, ctx, scene);
    }
};
