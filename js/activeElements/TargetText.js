var TargetText = function(x, y, label, color, font, lifespan, fadespan) {
    this.x = x
    this.y = y
    this.label = label
    this.color = color
    this.font = font
    this.sdx = 2
    this.sdy = 2
    this.shaddow = true
    this.shaddowColor = "#000000"
    this.fadespan = fadespan

    // dynamic values
    this.lifespan = lifespan
    this.fadein = -1
    this.fadeval = -1
}

TargetText.prototype.init = function(parent, scene) {
    this.parent = parent
    this.scene = scene
}

TargetText.prototype.evolve = function(delta, scene) {
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
}

TargetText.prototype.render = function(ctx, scene) {
    ctx.font = this.font

    if (this.lifespan > 0 && this.fadespan > 0 && this.lifespan < this.fadespan) {
        ctx.globalAlpha = this.lifespan / this.fadespan
    } else if (this.fadein > 0) {
        if (this.fadeval < 0) this.fadeval = this.fadein
        ctx.globalAlpha = 1 - this.fadeval/this.fadein
    }

    ctx.textBaseline = 'top'

    if (this.shaddow) {
        ctx.fillStyle = this.shaddowColor
        ctx.fillText(this.label, this.x + this.sdx, this.y + this.sdy);
    }
    ctx.fillStyle = this.color
    ctx.fillText(this.label, this.x, this.y);

    ctx.globalAlpha = 1
}

