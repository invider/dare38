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
    THRESHOLD: 0.49,
    w: 1,
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
    findCollidedElementInDirection: function(scene, x, y, dir){
        var el1, el2;
        switch (dir){
            case DIRECTIONS.DOWN:
            case DIRECTIONS.UP:
                x = Math.ceil(x);
                el1 = this.findElementsInDirection(scene, x - this.THRESHOLD * this.w, y, dir);
                el2 = this.findElementsInDirection(scene, x + this.THRESHOLD * this.w, y, dir);
                break;

            case DIRECTIONS.LEFT:
            case DIRECTIONS.RIGHT:
                y = Math.ceil(y);
                el1 = this.findElementsInDirection(scene, x, y - this.THRESHOLD * this.w, dir);
                el2 = this.findElementsInDirection(scene, x, y + this.THRESHOLD * this.w, dir);
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
