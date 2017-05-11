var TermText = function(x, y, label, color, font, ancor) {
    this.visible = true
    this.x = x
    this.y = y
    this.label = label
    this.typeSpeed = 0.15
    this.color = color? color : "#FFFFFF"
    this.font = font? font : '24px alien'
    this.ancor = ancor? ancor: 'absolute'
    this.sdx = 2
    this.sdy = 2
    this.shaddow = true
    this.shaddowColor = "#000000"
    this.blinking = false
    this.blinkspan = 0

    // dynamic values
    this.time = 0
    this.lifespan = -1
    this.fadespan = -1
    this.fadein = -1
    this.fadeval = -1
}

TermText.prototype.init = function(parent, scene) {
    this.parent = parent
    this.scene = scene
}

TermText.prototype.evolve = function(delta, scene) {
    this.time += delta
    if (this.lifespan > 0) {
        this.lifespan -= delta
        if (this.lifespan <= 0) {
            this.parent._killNode(this)
        }
    }
    if (this.fadeval > 0) {
        this.fadeval -= delta
        if (this.fadeval < 0) this.fadeval = 0
    }
    if (this.dx) this.x += this.dx*delta
    if (this.dy) this.y += this.dy*delta
    this.blinkspan += delta
}

TermText.prototype.render = function(ctx, scene) {
    if (!this.visible) return
    ctx.font = this.font

    var visible = Math.floor(this.time / this.typeSpeed)
    var text = this.label
    if (visible < text.length) {
        text = text.substring(0, visible)
        text += '█'
    }

    if (this.lifespan > 0 && this.fadespan > 0 && this.lifespan < this.fadespan) {
        ctx.globalAlpha = this.lifespan / this.fadespan
    } else if (this.fadein > 0) {
        if (this.fadeval < 0) this.fadeval = this.fadein
        ctx.globalAlpha = 1 - this.fadeval/this.fadein
    }

    switch(this.ancor) {
    case 'absolute':
        ctx.textBaseline = 'top'

        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(text, this.x + this.sdx, this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(text, this.x, this.y);
        break;

    case 'center':
        var thw = ctx.measureText(text).width/2
        ctx.textBaseline = 'middle'

        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(text, scene.screenWidth/2 - thw + this.x + this.sdx,
                scene.screenHeight/2 + this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(text, scene.screenWidth/2 - thw + this.x,
            scene.screenHeight/2 + this.y);
        break;

    case 'right':
        var tw = ctx.measureText(text).width
        ctx.textBaseline = 'top'

        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(text, scene.screenWidth - tw + this.x + this.sdx, this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(text, scene.screenWidth - tw + this.x, this.y);
        break;

    case 'bottom':
        ctx.textBaseline = 'bottom'
        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(text, this.x + this.sdx, scene.screenHeight + this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(text, this.x, scene.screenHeight + this.y);
        break;

    case 'edge':
        var tw = ctx.measureText(this.label).width
        ctx.textBaseline = 'bottom'
        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(text, scene.screenWidth - tw + this.x + this.sdx,
                scene.screenHeight + this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(text, scene.screenWidth - tw + this.x,
                scene.screenHeight + this.y);
        break;

    default:
            ctx.fillText(text, 0, 0);
    }
    ctx.globalAlpha = 1
}

