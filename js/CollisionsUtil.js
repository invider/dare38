/**
 * Created by shaddy on 23.04.17.
 */
var DIRECTIONS = {
    UP:1,
    DOWN:2,
    LEFT:3,
    RIGHT:4
};

var Collisions = {
    THRESHOLD: 0.9,
    findElementsInDirection: function (scene, x, y, dir, length) {
        length = length || 1;
        var res = [];
        for (var i = 0; i < length; i++) {
            switch (dir) {
                case DIRECTIONS.DOWN:
                    y += 1;
                    break;
                case DIRECTIONS.UP:
                    y -= 1;
                    break;
                case DIRECTIONS.LEFT:
                    x -= 1;
                    break;
                case DIRECTIONS.RIGHT:
                    x += 1;
                    break;
            }
            res.push(scene.root.planet.getElement(x, y));
        }
        return res;
    },
    findCollidedElementInDirection: function(scene, x, y, size, dir){
        var el1, el2, w = this.THRESHOLD * size;
        var x1 = x + w;
        var x2 = x + size - w;
        var y1 = y + w;
        var y2 = y + size - w;
        switch (dir){
            case DIRECTIONS.DOWN:
                el1 = this.findElementsInDirection(scene, Math.floor(x1), Math.floor(y+size)-1, dir);
                el2 = this.findElementsInDirection(scene, Math.floor(x2), Math.floor(y+size)-1, dir);
                break;
                
            case DIRECTIONS.UP:
                el1 = this.findElementsInDirection(scene, Math.floor(x1), Math.ceil(y), dir);
                el2 = this.findElementsInDirection(scene, Math.floor(x2), Math.ceil(y), dir);
                break;

            case DIRECTIONS.LEFT:
                el1 = this.findElementsInDirection(scene, Math.ceil(x), Math.floor(y1), dir);
                el2 = this.findElementsInDirection(scene, Math.ceil(x), Math.floor(y2), dir);
                break;
                
            case DIRECTIONS.RIGHT:
                el1 = this.findElementsInDirection(scene, Math.floor(x+size)-1, Math.floor(y1), dir);
                el2 = this.findElementsInDirection(scene, Math.floor(x+size)-1, Math.floor(y2), dir);
                break;

        }
        if (el1[0] && !(el1[0] instanceof EmptySpace)){
            return el1[0];
        }
        if (el2[0] && !(el2[0] instanceof EmptySpace)){
            return el2[0];
        }
    }

};
