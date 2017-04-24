var FloatingText = function(x, y, label, color, font) {
    this.visible = true
    this.x = x
    this.y = y
    this.label = label
    this.color = color? color : "#FFFFFF"
    this.font = font? font : '24px alien'
}

FloatingText.prototype.init = function(parent, scene) {
}

FloatingText.prototype.evolve = function(delta, scene) {
}

FloatingText.prototype.render = function(ctx, scene) {
    ctx.fillStyle = this.color
    ctx.font = this.font
    ctx.textBaseline = 'bottom'
    //var thw = ctx.measureText(this.label).width
    ctx.fillText(this.label, this.x, this.y);
}

