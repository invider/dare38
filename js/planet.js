/**
 * Created by shaddy on 22.04.17.
 */

var _titleBuilder = function (type) {
    switch (type) {
        case "X":
            return new Wall();
        case "U":
            return new UnbreakableWall();
        case " ":
            return new EmptySpace();
        case "P":
            return new PlayerSpawn();
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
        var xx = Math.floor(x);
        var yy = Math.floor(y);
        if (!this.children[yy] || !this.children[yy][xx]){
            var tmp = this._initElement(new EmptySpace(), this.scene)
            tmp.x = x;
            tmp.y = y;
            return tmp;
        }
        return this.children[yy][xx];
    };
    this.setElement = function(x, y, element){
        if (!this.children[y] || !this.children[y][x]){
            return element;
        }
        this.children[Math.floor(y)][Math.floor(x)] = element;
        return element;
    };
    this.gravitate = function(point, delta) {
		Util.fall(point, delta);
		var y = Math.ceil(point.y);
		var elem = this.findWallBelow(point.x - 0.5, point.x + 0.5, y);
		return Util.boundY(point, y - 1, y - 0.5 + (elem ? 0 : 1)) ? elem : undefined;
    };

    this.findWallBelow = function(x1, x2, y) {
    	var y = Math.ceil(y);
		var elem = this.getElement(x1, y)
		if(elem instanceof EmptySpace) {
			elem = this.getElement(x2, y)
		}
		return elem instanceof EmptySpace ? undefined : elem 
    };

    this.removeNode = function(node){
        this.setElement(node.x, node.y, this._initElement(new EmptySpace(), this.scene))
    };

    this._initElement = function(node, scene){
        node.init(this, scene);
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
        this.eachNode(function(node, x, y) { my._initElement(node, this.scene)});
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
    };
    this.kill = function(x,y, r){
        //
        //  TODO: kill in radius
        //
        r = r || 1;
        //
        //  TODO: fix and optimize this
        //
        var toKill = [];
        this.eachNode(function(node, xx, yy){
            if (Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2)) <= r){
                toKill.push(this.entity[i]);
            }
        });
        for (var i=0; i < toKill.length; i++){
            this.removeNode(toKill[i]);
        }
    };
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
    "X         XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX            X",
    "X           XXXXXXXXXXX                                   X",
    "X              XXXXXXXXXXXX   P                           X",
    "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
);
