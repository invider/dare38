var FloatingText = function(x, y, label, color, font, ancor) {
    this.visible = true
    this.x = x
    this.y = y
    this.label = label
    this.color = color? color : "#FFFFFF"
    this.font = font? font : '24px alien'
    this.ancor = ancor? ancor: 'absolute'
    this.sdx = 4
    this.sdy = 4
    this.shaddow = true
    this.shaddowColor = "#000000"

    // dynamic values
    this.lifespan = -1
    this.fadespan = -1
}

FloatingText.prototype.init = function(parent, scene) {
    this.parent = parent
    this.scene = scene
}

FloatingText.prototype.evolve = function(delta, scene) {
    if (this.lifespan > 0) {
        this.lifespan -= delta
        if (this.lifespan <= 0) {
            this.parent._killNode(this)
        }
    }
    if (this.dx) this.x += this.dx*delta
    if (this.dy) this.y += this.dy*delta
}

FloatingText.prototype.render = function(ctx, scene) {
    ctx.font = this.font

    if (this.lifespan > 0 && this.fadespan > 0 && this.lifespan < this.fadespan) {
        ctx.globalAlpha = this.lifespan / this.fadespan
    }

    switch(this.ancor) {
    case 'absolute':
        ctx.textBaseline = 'top'

        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(this.label, this.x + this.sdx, this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(this.label, this.x, this.y);
        break;

    case 'center':
        var thw = ctx.measureText(this.label).width/2
        ctx.textBaseline = 'middle'

        if (this.shaddow) {
            ctx.fillStyle = this.shaddowColor
            ctx.fillText(this.label, scene.screenWidth/2 - thw + this.x + this.sdx,
                scene.screenHeight/2 + this.y + this.sdy);
        }
        ctx.fillStyle = this.color
        ctx.fillText(this.label, scene.screenWidth/2 - thw + this.x,
            scene.screenHeight/2 + this.y);
        break;

    default:
            ctx.fillText(this.label, 0, 0);
    }
    ctx.globalAlpha = 1
}

