var FloatingText = function(x, y, label, color, font, ancor) {
    this.visible = true
    this.x = x
    this.y = y
    this.label = label
    this.color = color? color : "#FFFFFF"
    this.font = font? font : '24px alien'
    this.ancor = ancor? ancor: 'absolute'
}

FloatingText.prototype.init = function(parent, scene) {
}

FloatingText.prototype.evolve = function(delta, scene) {
}

FloatingText.prototype.render = function(ctx, scene) {
    ctx.fillStyle = this.color
    ctx.font = this.font

    switch(this.ancor) {
    case 'absolute':
        ctx.textBaseline = 'top'
        ctx.fillText(this.label, this.x, this.y);
        break;

    case 'center':
        var thw = ctx.measureText(this.label).width/2
        ctx.textBaseline = 'middle'
        ctx.fillText(this.label, scene.screenWidth/2 - thw + this.x,
            scene.screenHeight/2 + this.y);
        break;

    default:
            ctx.fillText(this.label, 0, 0);
    }
}

