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

    this.evolve = function (delta, scene) {
        // Util.killAllButNotPlayer(this.scene, this.x + 1, this.y + 1);
        // Util.killAllButNotPlayer(this.scene, this.x - 1, this.y - 1);
        // Util.killAllButNotPlayer(this.scene, this.x + 1, this.y - 1);
        // Util.killAllButNotPlayer(this.scene, this.x - 1, this.y + 1);
    };
    this.render = function (ctx, scene) {
        ctx.drawImage(scene.res.img['stone-3'],this.x,this.y, this.width, this.height);
    };
};

Util.extend(UnbreakableWall, Wall);

