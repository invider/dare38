/**
 * Created by shaddy on 22.04.17.
 */
var UnbreakableWall = function () {
    Wall.call(this);
    this.stroke = function(){
        console.log("Not so fast!!!");
    }
    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };
};

Util.extend(UnbreakableWall, Wall);

