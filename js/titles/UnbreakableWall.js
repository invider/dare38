/**
 * Created by shaddy on 22.04.17.
 */
var UnbreakableWall = function () {
    Wall.call(this);
    this.stroke = function(){
        console.log("Not so fast!!!");
    }
};

util.extend(UnbreakableWall, Wall);

