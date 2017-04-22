/**
 * Created by shaddy on 22.04.17.
 */

var _titleBuilder = function (type) {
    switch (type) {
        case "X":
            return new Wall();
        case " ":
            return new EmptySpace();
        case "P":
            //
            //  TODO: implement this
            //
            return new Player()
    }
};
var centerField = function(field, w, h){
    var maxX = 0;
    for (var y = 0; y < field.length; i++){
        maxX =Math.max(maxX, field[y].length);
    }
    if (maxX > w){
        throw new Error("Error, width is to big, max is:" + w);
    }
    if (maxY > h){
        throw new Error("Error, height is to big, max is:" + h);
    }
};

var PlanetProto = function () {
    var my = this;
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
    this.getElement = function(x, y){
        return this.children[Math.ceil(y)][Math.ceil(x)];
    };

    this.removeNode = function(node){
        this.children[node.x][node.x] = this._initElement(new EmptySpace());
    };

    this._initElement = function(node){
        node.width = 1;
        node.height = 1;
        return node;
    };
    this.eachNode = function(fn){
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {
                fn(this.children[y][x], x, y);
            }
        }
    };

    this.init = function (parentNode, scene) {
        this.scene = scene;
        this.eachNode(function(node, x, y) { my._initElement(node)});
    };

    this.evolve = function (delta, scene) {
        this.eachNode(function(node, x, y) {
            node.x = x;
            node.y = y;
        });
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
    "X                XXXXXXXXXX           XXXXXXXXXX          X",
    "X                X        X           X        X          X",
    "X                X        X           X        X          X",
    "X                X        X           X        X          X",
    "X                X        X           X        X          X",
    "X                XXXXXXXXXX           XXXXXXXXXX          X",
    "X                             X                           X",
    "X                              X                          X",
    "X                              X                          X",
    "X                              X                          X",
    "X                            XXXX                         X",
    "X              X                              X           X",
    "X               XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX            X",
    "X                                                         X",
    "X                                                         X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
);
