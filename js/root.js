/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {
        this.background = _background;
        this.entity.push(Digger(20, 20));
    },

    evolve: function(delta, scene) {
        Util.evolveChildren(this.entity, delta, scene);
    },

    render: function(ctx, scene) {
        this.background.render(ctx, scene)
    }
};
