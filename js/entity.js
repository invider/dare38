/** @typedef {{x:number, y:number, evolve:function, render:function}} Entity */
var _entity = {
    init: function(parent, scene) {
        this.x = 100;
        this.y = 100;
    },
    evolve: function(delta, scene) {
        this.x += 10*delta;
        this.y += 10*delta;
    },
    render: function(ctx, scene) {
        ctx.strokeStyle="red";
        ctx.rect(this.x,this.y,40,40);
        ctx.stroke();
    }
}
