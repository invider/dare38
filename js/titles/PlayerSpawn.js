var PlayerSpawn = function () {
    EmptySpace.call(this);

    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };
};

Util.extend(PlayerSpawn, EmptySpace);