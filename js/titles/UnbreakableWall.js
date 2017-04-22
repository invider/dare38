/**
 * Created by shaddy on 22.04.17.
 */
var UnbreakableWall = function () {
    Wall.call(this);
    this.triedToBreak = false;
    this.stroke = function () {
        //console.log("Not so fast!!!");
        if (!this.triedToBreak) {
            Util.playSound("CannotBreak");
            this.triedToBreak = true;
        }
    };
    this.evolve = function () {
        this.scene.root.kill(this.x + 1, this.y + 1);
        this.scene.root.kill(this.x - 1, this.y - 1);
        this.scene.root.kill(this.x + 1, this.y - 1);
        this.scene.root.kill(this.x - 1, this.y + 1);
    };
    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    };
};

Util.extend(UnbreakableWall, Wall);

