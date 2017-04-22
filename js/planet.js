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
    for (var i = 0; i < arguments.length; i++) {
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
    /**
     *
     * @param x
     * @param y
     * @returns {Entity}
     */
    this.getElementByCell = function(x, y){
        return this.children[y][x];
    };
    this.getRatio = function(){
        return {
            x: this.xSize / this.scene.width,
            y: this.ySize / this.scene.height
        }
    };
    /**
     *  returns element by physical coordinates
     * @param x
     * @param y
     * @returns {Entity}
     */
    this.getElement = function(x, y){
        return this.getElementByCell(Math.round(x * this.ratio.x), Math.round(y * this.ratio.y));
    };

    this.init = function (parentNode, scene) {
        this.scene = scene;
        this.ratio = this.getRatio();
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {
                this.getElementByCell(x, y).width = this.scene.width / this.xSize;
                this.getElementByCell(x, y).height = this.scene.height / this.ySize;
            }
        }
        for (var k in this.children) {
            Util.initChildren(this.children[k], parentNode, scene);
        }
    };

    this.evolve = function (delta, scene) {
        for (var k in this.children) {
            Util.evolveChildren(this.children[k], delta, scene);
        }
    };

    this.render = function (ctx, scene) {
        for (var k in this.children) {
            Util.renderChildren(this.children[k], ctx, scene);
        }
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
