/**
 * Created by shaddy on 22.04.17.
 */

var _titleBuilder = function (type) {
    switch (type) {
        case "X":
            return new Wall();
        case " ":
            return new EmptySpace();
    }
};

var PlanetProto = function () {
    var field = [];
    for (var i = 1; i < arguments.lenght; i++) {
        var chunk = arguments[i].split("\n")
            .map(function (s) {
                return s.trim();
            });

        field = field.concat(chunk);
    }

    this.x = 0;
    this.y = 0;
    this.xSize = field[0].length;
    this.ySize = field.length;
    this.children = [];
    for (var y = 0; y < this.ySize; y++) {
        var row = [];
        var txtRow = field[y];
        this.children.push(row);
        for (var x = 0; x < this.xSize; x++) {
            row.push(_titleBuilder(txtRow.charAt(x)));
        }
    }
    this.getElement = function(x, y){
        return this.children[x][y];
    };
    this.init = function (parentNode, scene) {
        Util.initChildren(this, parentNode, scene);
    };

    this.evolve = function (delta, scene) {
        //none done here
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {

            }
        }
        Util.evolveChildren(this, delta, scene);
    };

    this.render = function (ctx, scene) {
        Util.renderChildren(this, delta, scene);
    }
};

/**
 * Planet initializers:
 * X: wall
 *
 * @type {PlanetProto}
 */
var _Planet = new PlanetProto(
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X                                                         X",
    "X                                                         X",
    "X                                                         X",
    "X                                                         X",
    "X                                                         X",
    "X                                                         X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
);