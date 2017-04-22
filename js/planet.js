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

    this.relativeToAbsoluteX = function(x){
        return Math.round(x * this.ratio.x);
    };

    this.relativeToAbsoluteY = function(y){
        return Math.round(y * this.ratio.y);
    };

    this.removeNode = function(node){
        this.children[node.relativeY][node.relativeX] = this._initElement(new EmptySpace());
    };

    this.getRatio = function(){
        return {
            x: this.scene.width /this.xSize,
            y: this.scene.height / this.ySize
        }
    };
    this._initElement= function(node, x, y){
        node.width = this.scene.width / this.xSize;
        node.height = this.scene.height / this.ySize;
        //Util.initChildren(this.children[k], parentNode, scene);
        node.relativeX = x;
        node.relativeY = y;
        return node;
    };
    /**
     *  returns element by physical coordinates
     * @param x
     * @param y
     * @returns {Entity}
     */
    this.getElement = function(x, y){
        return this.getElementByCell(this.relativeToAbsoluteX(x), this.relativeToAbsoluteY(y));
    };

    this.init = function (parentNode, scene) {
        this.scene = scene;
        this.ratio = this.getRatio();
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {
                this._initElement(this.getElementByCell(x, y), x ,y)
            }
        }
    };

    this.evolve = function (delta, scene) {
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {
                this.getElementByCell(x, y).x = this.relativeToAbsoluteX(x);
                this.getElementByCell(x, y).y = this.relativeToAbsoluteY(y);
            }
        }
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
    "X                XXXXXXXXXX                               X",
    "X                X        X                               X",
    "X                X        X                               X",
    "X                X        X                               X",
    "X                XXXXXXXXXX                               X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
);
