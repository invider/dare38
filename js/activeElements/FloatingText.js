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
}

FloatingText.prototype.init = function(parent, scene) {
}

FloatingText.prototype.evolve = function(delta, scene) {
}

FloatingText.prototype.render = function(ctx, scene) {
    ctx.font = this.font

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
}

