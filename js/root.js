/** @type Entity */
var _$root = {
    planet: {},
    entity: [],

    init: function(parent, scene) {
        this.background = _background;
        this.planet = _Planet;
        this.planet.init(this, scene);
        this.entity.push(Digger(20, 20));
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
