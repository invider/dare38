var _background = {

    init: function(parent, scene) {

    },

    evolve: function(delta, scene) {},

    render: function(ctx, scene) {
        ctx.beginPath();
        ctx.rect(0, 0, scene.screenWidth, scene.screenHeight);
        ctx.fillStyle = "#220044"
        ctx.fill();
    }
}
