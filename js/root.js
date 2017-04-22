/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {
        this.background = _background;
    },

    evolve: function(delta, scene) {
        Util.evolveChildren(entity, delta, scene);
    },

    render: function(ctx, scene) {
        this.background.render(ctx, scene)
    }
};
