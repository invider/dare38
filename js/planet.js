/**
 * Created by shaddy on 22.04.17.
 */
var _titleBuilder = function (type) {
    switch (type) {
        case "U":
            return new UnbreakableWall();
        case " ":
            return new EmptySpace();
        case "P":
            return new PlayerSpawn();
        case "B":
            return new BaseNode();
        case "F":
            return new FuelStation();
        default:
            return new Wall(type);
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

    this.generate = function(scene) {
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
    }
    /**
     *
     * @param x
     * @param y
     * @returns {Entity}
     */
    this.getElement = function(x, y){
        var xx = Math.round(x);
        var yy = Math.round(y);
        if (!this.children[yy] || !this.children[yy][xx]){
            var tmp = this._initElement(new EmptySpace(), this.scene)
            tmp.x = xx;
            tmp.y = yy;
            return tmp;
        }
        return this.children[yy][xx];
    };
    this.setElement = function(x, y, element){
        x = Math.round(x);
        y = Math.round(y);
        if (!this.children[y] || !this.children[y][x]){
            return element;
        }
        this.children[y][x] = element;
        return element;
    };
    
    this.removeNode = function(node){
        this.setElement(node.x, node.y, this._initElement(new EmptySpace(), this.scene))
    };

    this._initElement = function(node, scene, x, y){
        node.init(this, scene);
        node.x = x;
        node.y = y;
        return node;
    };
    this.eachNode = function(fn){
        for (var y = 0; y < this.ySize; y++) {
            for (var x = 0; x < this.xSize; x++) {
                if (fn(this.children[y][x], x, y) === false){
                    return false;
                }
            }
        }
    };

    this.spawnWall = function(x, y, type){
        x = Util.absToRounded(x);
        y = Util.absToRounded(y);
        if (this.getElement(x, y) instanceof EmptySpace){
            this.setElement(x, y,my._initElement(new Wall(type), this.scene, x, y));
        }
    };

    this.init = function (parentNode, scene) {
        this.scene = scene;
        this.generate();
        this.eachNode(function(node, x, y) { my._initElement(node, this.scene, x, y)});
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
            if (Util.getLength(x, y, xx, yy) <= r){
                res.push(node);
            }
        });
        return res;
    };
    this.kill = function(x,y, r){
        if (x instanceof PlanetElement){
            this.removeNode(x);
        } else {
            var toKill = this.getNearbyNodes(x, y, r);
            for (var i=0; i < toKill.length; i++){
                this.removeNode(toKill[i]);
            }
        }
    };
    /**
     * returns player spawn point
     * @returns {PlayerSpawn}
     */
    this.getSpawnPoint = function(){
        var retVal = false;
        this.eachNode(function(node, x, y){
            if (node instanceof PlayerSpawn){
                retVal = node
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
    "X       F                     X                           X",
    "X      GGGGGGGGGGG       U      U   U     X               X",
    "X       GGGGGGGGGG    X       U                   X       X",
    "X        GGGGGGG      UUUU            X      UU  U        X",
    "X          GGG               XXXX              UU         X",
    "X              X           BB     UUU         X           X",
    "X         XXXXXXXXXXXXXXXXBBBBXXXXXXXXXXXXXXXX            X",
    "X           XXXXXXXXXXX  BBBBBBB                          X",
    "X              XXXXXXXXXXBBF  P                           X",
    "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
);
