/** @typedef {{x:number, y:number, evolve:function, render:function}} Entity */
var _entity = {

    imgs: [],
    currentImg: Image(),
    index: 0,
    frameTick: 0.0,
    acum: 0.0,

    init: function(parent, scene) {
        this.x = 100;
        this.y = 100;
        this.currentImg = this.imgs[this.index];
    },
    evolve: function(delta, scene) {
        this.x += 10*delta;
        this.y += 10*delta;

        if(this.acum >= this.frameTick) {
            if(this.index === this.imgs.length)
                this.index = 0;
            else
                this.index += 1;
            this.currentImg = this.imgs[this.index];
            this.acum = 0.0;
        }
        else {
            this.acum += delta;
        }
    },
    render: function(ctx, scene) {
        // ctx.strokeStyle="red";
        // ctx.rect(this.x,this.y,40,40);
        ctx.drawImage(this.currentImg, this.x, thix.y);
        ctx.stroke();
    },
    initAnimation: function(duration) {
        this.frameTick = duration / this.imgs.length;
    }
};
