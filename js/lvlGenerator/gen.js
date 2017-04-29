/**
 * Created by shaddy on 29.04.17.
 */
var Mapper = {
    rand: new RNG(10), // choose different seed to change lvl configuration
    randElem: function (arr) {
        return arr[Math.floor(Mapper.rand.nextFloat() * arr.length)];
    },
    LifeWorld: function (xSize, ySize, parent) {
        var factor = 1;
        var my = this;
        this.map = [];
        var checkCell = function (x, y) {
            if (!my.map[y]) {
                throw new Error("No such Y:" + y);
            }
            if (my.map[y][x] == undefined) {
                throw new Error("No such X:" + x);
            }
        };
        this.get = function (x, y) {
            checkCell(x, y);
            return this.map[y][x];
        };

        this.set = function (x, y, elem) {
            checkCell(x, y);
            this.map[y][x] = elem;
        };

        this.remove = function (x, y) {
            checkCell(x, y);
            if (isNaN(x)) {
                y = x.y;
                x = x.x;
            }
            this.map[y][x] = false;
        };

        this.eachXY = function (cb) {
            for (var y = 0; y < ySize; y++) {
                for (var x = 0; x < xSize; x++) {
                    cb(x, y);
                }
            }
        };
        this.eachCell = function (cb) {
            this.eachXY(function (x, y) {
                cb(x, y, my.get(x, y));
            })
        };
        /**
         *
         * @param x
         * @param y
         * @returns {{cells: [{x:number, y:number}], free: [{x:number, y:number}]}}
         */
        this.getNeibours = function (x, y) {
            var fromX = Math.max(0, x - 1);
            var toX = Math.min(xSize - 1, x + 1);
            var fromY = Math.max(0, y - 1);
            var toY = Math.min(ySize - 1, y + 1);

            var res = {
                cells: [],
                free: []
            };
            var tostr = function () {
                return "{x:" + this.x + "y:" + this.y + "}";
            };
            for (var xx = fromX; xx <= toX; xx++) {
                for (var yy = fromY; yy <= toY; yy++) {
                    var cell = my.get(xx, yy);
                    if (cell) {
                        res.cells.push({x: x, y: y, toString: tostr});
                    } else {
                        res.free.push({x: x, y: y, toString: tostr});
                    }
                }
            }
            return res;
        };

        this.iterate = function () {
            var newWorld = new Mapper.LifeWorld(xSize, ySize, this);
            this.eachCell(function (x, y, cell) {
                //var neibourCells = my.getNeibours(x, y);
                var neibourCells = newWorld.getNeibours(x, y);
                if (neibourCells.cells.length > 3 || neibourCells.cells.length < 2) {
                    newWorld.remove(x, y);
                } else if (neibourCells.cells.length == 3) {
                    for (var k in neibourCells.free) {
                        var dead = neibourCells.free[k];
                        var parents = my.getNeibours(dead.x, dead.y);
                        if (parents.cells.length == 3) {
                            //console.log("creating:" + dead.x + ":" + dead.y)
                            newWorld.set(dead.x, dead.y, true);
                        }
                    }

                }
            });
            return newWorld;
        };

        this.init = function () {
            this.eachXY(function (x, y) {
                my.map[y] = my.map[y] || [];
                if (parent) {
                    my.map[y][x] = parent.get(x, y);
                } else {
                    my.map[y][x] = false;
                }
            })
        };

        this.randomize = function () {
            this.eachXY(function (x, y) {
                my.set(x, y, Mapper.rand.nextFloat() * factor > 0.5)
            });
            return this;
        };

        this.toString = function () {
            return this.map.map(function (e) {
                return e.map(function (cell) {
                    return cell ? "*" : " ";
                }).join("")
            }).join("\n")
        };
        my.init();
    },
    generate: function (x, y, iterations) {
        var w = new this.LifeWorld(x, y).randomize()
        for (var i = 0; i < iterations; i++) {
            w = w.iterate();
        }
        return w;
    },
    /**
     *
     * @param string
     * @param w {LifeWorld}
     * @param tags {[string]}
     */
    applyMapping: function(field, tag, tags){
        var mapped = field.map(function(s){
            return s.split("");
        });
        var xSize = mapped[0].length;
        var ySize = mapped.length;
        var w = this.generate(xSize, ySize, 5);
        return mapped.map(function(row, y){
            return row.map(function(cell, x){
                if (cell == tag){
                    if (w.get(x, y)){
                        return Mapper.randElem(tags);
                    } else {
                        return " ";
                    }

                } else {
                    return cell;
                }
            });
        }).map(function(row){
            return row.join("");
        })
    }
};


