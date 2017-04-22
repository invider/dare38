var _wonderer = {

    x: 0, y: 0,
    dx: 0, dy: 0,
    dt: 0, 

    init: function(parent, scene) {
        x = scene.width/2
        y = scene.height/2
    }

    evolve: function(delta, scene) {
        dt -= delta
        if (dt <= 0) {
            dt = 1 + Math.random()
            dx = Math.random()
            dy = Math.random()
        }
        this.x += dx*delta;
        this.y += dy*delta;
    },

    render: function(ctx, scene) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 4, 4);
        ctx.fillStyle="red";
        ctx.fill()
    }
}
