
_ = scene = (function(window) {
"use strict"

var TARGET_FPS = 60
var MAX_EVO_TIME = 0.1

var canvas, ctx
var lastFrame = Date.now()

var scene = {
    name: "Scene",
    width: 100,
    height: 100,
    pause: true,

    // event flags
    mouseX: 0,
    mouseY: 0,
    mouseButton: '---',
    statusLine: 'No Status',
    keys: {},
    gameoverFlag: false,

    attach: function(node) {
        this.root.entity.push(node)
        if (node.init) node.init(this.root, scene)
    },

    initStatistic: function (scene){
        this.statistic = {
            turrets: 10,
            bombs: 3,
            lifes: 5,
            level: 0,
            scene: scene,
            diggersToSpawn: 30,
            spawnedDiggers:0,
            diggersAlive:0,
            toString:function(){
                return "Level:" + this.level + 
                " Turrets: " + this.turrets + 
                " Bombs:" + this.bombs + 
                " Lifes:" + this.lifes + 
                " Diggers:" + this.spawnedDiggers + 
                " Left:" + (this.diggersToSpawn - this.spawnedDiggers) + 
                " Alive:" + this.diggersAlive + 
                (
                    !this.scene.root.player ? "" : 
                        ( 
                            " Fuel:" + this.scene.root.player.stats.fuel.toFixed(2)
                        )
                )
            }
        };
    },
    levelComplete: function(){
        console.log("Complete!!!!");
    },
    gameOver: function(){
        this.gameoverFlag = true;
        console.log("Oh noooooooooo, GAME OVER!!!!!!!!!!");
    },
    checkCompletion:function(){
        if (this.statistic.diggersToSpawn == this.statistic.spawnedDiggers && this.statistic.diggersAlive == 0){
            this.levelComplete();
        }
    }
};
scene.initStatistic(scene);
// === INIT ====
function expandCanvas() {
    var canvas = document.getElementById('canvas')
    var newWidth = window.innerWidth
    var newHeight = window.innerHeight
    canvas.width = scene.screenWidth = newWidth
    canvas.height = scene.screenHeight = newHeight
    canvas.style.width = newWidth + 'px'
    canvas.style.height = newHeight + 'px'
    render(0)
}

function init() {
    scene.manifest = _$resManifest
    scene.res = _$resManager
    scene.res.init(scene)


    load()

    scene.physics = new Physics();
    scene.physics.init(scene);

    // setup canvas
    canvas= document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
    }
    if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen(); //Firefox
    }
    expandCanvas()

    // setup scene
    scene.root = _$root
    scene.root.init(scene, scene)


    // initiate the game loop
    if (TARGET_FPS <= 0) {
        setInterval(loop, 1)
    } else {
        setInterval(loop, 1000/TARGET_FPS)
    }
}

function load() {
    scene.manifest.img.forEach( function(img) {
        scene.res.loadImg(img.name, img.src)
    })
    scene.manifest.sfx.forEach( function(sfx) {
        scene.res.loadSfx(sfx.name, sfx.src)
    })
}


// === GAME LOOP ===

// process input events (controls, random, AI)
function input(delta) {
	// TODO process input handlers
}

function evolve(delta) {
    if (scene.pause) return
    scene.root.evolve(delta, scene)
}

var fps = 0, fpsa = 1, fpsc = 0
function render(delta) {
    if (!scene.root) return

    // render load screen
    if (scene.res.loaded < scene.res.expected) {
        scene.root.background.render(ctx, scene)
        var progress = Math.round((scene.res.loaded / scene.res.expected) * 100)
        var loadingStatus = "Loading Resources: " + progress + "%"
        ctx.fillStyle = "#FFFF00"
        ctx.font = '24px alien'
        ctx.textBaseline = 'bottom'
        var thw = ctx.measureText(loadingStatus).width / 2
        ctx.fillText(loadingStatus, scene.screenWidth/2 - thw, scene.screenHeight/2);
        return
    }

    scene.root.render(ctx, scene)

    // draw status
    if (fpsa >= 1 && delta > 0) {
        fps = Math.round(fpsc/fpsa)
        fpsa = delta
        fpsc = 1
    } else {
        fpsc += 1
        fpsa += delta
    }

    var status = 'fps: ' + fps
        +' mouse: ' + scene.mouseX + 'x' + scene.mouseY + ', ' + scene.mouseButton
        + " Keyboard: "
    for (var k in scene.keys) {
        status += "-" + k
    }
    status += '-'

    ctx.font = '24px alien'
    ctx.textBaseline = 'bottom'
    ctx.fillStyle = "#FFFF00"
    ctx.fillText(status, 10, 30)
    ctx.fillText(scene.statusLine, 10, 60)
}


function loop() {
    var now = Date.now()
    var delta = (now - lastFrame)/1000
    var fdelta = delta

    // show, react and update cycle
    input(delta)

    // evolve multiple times in small quants
    // to compensate possible lag due to rendering delays
    while(delta > 0) {
        if (delta > MAX_EVO_TIME) {
            evolve(MAX_EVO_TIME);
        } else {
            evolve(delta);
        }
        delta -= MAX_EVO_TIME
    }
    render(fdelta)

    lastFrame = now
}

// === EVENTS ===
function handleMouse(e) {
    e = e || window.event
    scene.mouseX = e.pageX
    scene.mouseY = e.pageY
    e.preventDefault()
    e.stopPropagation()
    return false;
}

function handleMouseDown(e) {
    switch (e.button) {
    case 0: scene.mouseButton = '*--';
            break;
    case 1: scene.mouseButton = '-*-';
            break;
    case 2: scene.mouseButton = '--*';
            break;
    }
    e.preventDefault()
    e.stopPropagatton = e.button
    return false;
}

function handleMouseUp(e) {
    scene.mouseButton = '---'
}

function handleMouseDoubleClick(e) {
    switch (e.button) {
    case 0: scene.mouseButton = '+--';
            break;
    case 1: scene.mouseButton = '-+-';
            break;
    case 2: scene.mouseButton = '--+';
            break;
    }
    e.preventDefault()
    e.stopPropagatton = e.button
    return false;
}

function handleMouseOut(e) {
    for (var k in scene.keys) {
        delete scene.keys[k]
    }
}

function handleContextMenu() {
    return false;
}

function handleKeyDown(e) {
    var code = e.which || e.keyCode
    if (code == 116 || code == 123){
        return true;
    }
    scene.keys[code] = 1

    e.preventDefault()
    e.stopPropagation()
    return false;
}

function handleKeyUp(e) {
    var code = e.which || e.keyCode
    if (code == 116 || code == 123){
        return true;
    }
    delete scene.keys[code]

    e.preventDefault()
    e.stopPropagation()
    return false;
}


// bind to events
window.addEventListener('resize', expandCanvas, false)
window.onload = init;
window.onmousemove = handleMouse
window.onmousedown = handleMouseDown
window.onmouseup = handleMouseUp
window.onmouseout = handleMouseOut
window.ondblclick = handleMouseDoubleClick
window.oncontextmenu = handleContextMenu
window.onkeydown = handleKeyDown
window.onkeyup = handleKeyUp


return scene;

}(this))

