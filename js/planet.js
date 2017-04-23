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
        case "B":
            return new BaseNode();
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
    
    this.bumpToWall = function(point) {
    	var w = point.w || 1;
		var h = point.h || 1;
		var x = Math.ceil(point.x);
		var y = Math.ceil(point.y);
		var up = this.findWallAbove(point);
		var down = this.findWallBelow(point);
		var left = this.findWallLeft(point);
		var right = this.findWallRight(point);
		var vertical = Util.boundY(point, y + 0.5 * h - (up ? 1 : 2), y - 0.5 * h + (down ? 0 : 1));
		var horizontal = Util.boundX(point, x + 0.5 * w - (left ? 1 : 2), x - 0.5 * w + (right ? 0 : 1));
		return vertical && (down || up) || horizontal && (left || right);
    }

    this.findWallAbove = function(point) {
    	var w = point.w || 1;
    	var x1 = point.x - 0.49 * w;
    	var x2 = point.x + 0.49 * w;
    	var y = Math.floor(point.y) - 1;
		var elem = this.getElement(x1, y)
		if(elem instanceof EmptySpace) {
			elem = this.getElement(x2, y)
		}
		return elem instanceof EmptySpace ? undefined : elem 
    };
    
    this.findWallBelow = function(point) {
    	var w = point.w || 1;
    	var x1 = point.x - 0.49 * w;
    	var x2 = point.x + 0.49 * w;
    	var y = Math.ceil(point.y);
		var elem = this.getElement(x1, y)
		if(elem instanceof EmptySpace) {
			elem = this.getElement(x2, y)
		}
		return elem instanceof EmptySpace ? undefined : elem 
    };
    
    this.findWallLeft = function(point) {
    	var h = point.h || 1;
    	var y1 = point.y - 0.49 * h;
    	var y2 = point.y + 0.49 * h;
    	var x = Math.floor(point.x) - 1;
		var elem = this.getElement(x, y1)
		if(elem instanceof EmptySpace) {
			elem = this.getElement(x, y2)
		}
		return elem instanceof EmptySpace ? undefined : elem 
    };
    
    this.findWallRight = function(point) {
    	var h = point.h || 1;
    	var y1 = point.y - 0.49 * h;
    	var y2 = point.y + 0.49 * h;
    	var x = Math.ceil(point.x);
		var elem = this.getElement(x, y1)
		if(elem instanceof EmptySpace) {
			elem = this.getElement(x, y2)
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
                if (fn(this.children[y][x], x, y) === false){
                    return;
                }
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
    /**
     * returns nodelist of nodes in given raduis
     * NOTE: this is only planet nodes
     * @param x
     * @param y
     * @param r - radius to detect
     */
    this.getNearbyNodes = function(x, y, r){
        r = r || 1;
        var res = [];
        this.eachNode(function(node, xx, yy){
            if (Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2)) <= r){
                res.push(this.entity[i]);
            }
        });
        return res;
    };
    this.kill = function(x,y, r){
        //
        //  TODO: fix and optimize this
        //
        var toKill = this.getNearbyNodes(x, y, r);
        for (var i=0; i < toKill.length; i++){
            this.removeNode(toKill[i]);
        }
    };
    /**
     * returns player spawn point
     * @returns {{x:number, y:number}}
     */
    this.getSpawnPoint = function(){
        var retVal = false;
        this.eachNode(function(node, x, y){
            if (node instanceof PlayerSpawn){
                retVal = {
                    x: x,
                    y: y
                }
            }
        });
        if (!retVal){
            throw new Error("Could not find player spawn!!!");
        }
        return retVal;
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
    "X              X           BB                 X           X",
    "X         XXXXXXXXXXXXXXXXBBBBXXXXXXXXXXXXXXXX            X",
    "X           XXXXXXXXXXX  BBBBBBB                          X",
    "X              XXXXXXXXXXBB   P                           X",
    "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
);
