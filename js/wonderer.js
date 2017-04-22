var _wonderer = {

    x: 0, y: 0,
    dx: 0, dy: 0,
    dt: 0, 
    SPEED: 50,

    init: function(parent, scene) {
        this.x = 400
        this.y = 200
    },

    evolve: function(delta, scene) {
        this.dt -= delta
        if (this.dt <= 0) {
            this.dt = 1 + Math.random()*2
            this.dx = this.SPEED*Math.random()
            this.dy = this.SPEED*Math.random()
        }
        this.x += this.dx*delta;
        this.y += this.dy*delta;
    },

    render: function(ctx, scene) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 20, 20);
        ctx.fillStyle="red";
        ctx.fill()
    }
}
