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
        case "f":
            return new FuelStation();
        case "b":
            return new BombStation();
        case "w":
            return new WallStation();
        case "t":
            return new TurretStation();
        
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
    this.getNearbyNodes = function(x, y, r, filter){
        r = r || 1;
        var res = [];
        this.eachNode(function(node, xx, yy){
            if (Util.getLength(x, y, xx, yy) <= r){
                res.push(node);
            }
        });
        if (filter){
            return res.filter(filter);
        }
        return res;
    };
    this.kill = function(x,y,r){
        if (x instanceof PlanetElement){
            this.removeNode(x);
        } else {
            var toKill = this.getNearbyNodes(x, y, r);
            for (var i=0; i < toKill.length; i++){
                this.removeNode(toKill[i]);
            }
        }
    };
    this.hit = function(x, y, r, power, filter){
        this.getNearbyNodes(x, y, r)
            .forEach(function(element) {
                element.hit(power)
            }, filter)
    }
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
            // probably game over
            //throw new Error("Could not find player spawn!!!");
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
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "XWWWWWWWWWWW            WWWWWWWWWWWWWWWWWWWWX",
    "XIIIIIIIW                  QQQQQQQQQQQQQQQQQX",
    "XIIIIIWQ                      QQQQIIIIIIIIIIX",
    "XIIIQQ   SSSSSSSSSSSSSAAASSAA   QQQIIIIIIIIIX",
    "XIIQ       zxxDDAAAAADGGGDDD         QQQQIIIX",
    "XIQ         zxGGGAAGDDDDDUD      UUUUUUUUQIIX",
    "XQ            xDDDDDDGGGGUG              QQQX",
    "X              zzUxxxxxxxUz              AQQX",
    "X               zUxxxxzzzU                AQX",
    "X     UUUUUUUUU zUxx   zz                  AX",
    "X                Uz    z       UUUUUUUUUUUUUX",
    "X                 z       0                 X",
    "XDDAASSSAADDgg0     0     0       0         X",
    "X GGGAAAGGGGGGUUUUUUU     0       0         X",
    "X  dGGGGGGGGad            UUUUUUUUU         X",
    "X   dGGGGGGGd          B                 0000X",
    "X    daaadss    B     BB     B  0           X",
    "X     ddds   0 BB wt BBB bf BB000           X",
    "X     sss    0BBBBBBBBBBBBBBBBBB0    000000 X",
    "X      s     BBBBBBBBBBBBBBBBBBBB           X",
    "X                     P                     X", 
    "UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
);
