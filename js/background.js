var _background = {

    init: function(parent, scene) {

    },
    update: function() {},
    render: function(ctx, scene) {
        ctx.beginPath();
        ctx.rect(0, 0, 150, 100);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}
