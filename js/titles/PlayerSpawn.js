var PlayerSpawn = function () {
    EmptySpace.call(this);

    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['soil-wired'],this.x,this.y, this.width, this.height);
    };
    this.respawn = function(){
        // TODO: respawn player here
    }
};

Util.extend(PlayerSpawn, EmptySpace);
