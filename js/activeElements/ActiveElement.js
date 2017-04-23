/**
 * Created by shaddy on 23.04.17.
 */
var __uniqId = 0;
var ActiveElement = function(x, y, scene, imgs, animationDuration){
    imgs = imgs || [];
    animationDuration = animationDuration || 0;
    this.id = __uniqId ++;
    this.x = x;
    this.y = y;
    this.airFrictionFactor = 1;
    this.velocity = 0;
    this.horzVelocity = 0;
    this.acceleration = 0;
    this.horzAcceleration = 0;
    this.scene = scene;
    this.type = "ActiveElement";

    this.imgs = imgs;
    this.currentImg = imgs[0];
    this.index = 0;
    this.frameTick = (animationDuration / imgs.length) / 1000.0;
    this.acum = 0.0;
};

ActiveElement.prototype.init = function(){

};

ActiveElement.prototype.kill = function(){
    console.log(this + ": killed!");
};

ActiveElement.prototype.evolve = function(delta, scene){
    if(this.imgs.length > 1 && this.acum >= this.frameTick) {
        if(this.index === (this.imgs.length - 1))
            this.index = 0;
        else
            this.index += 1;
        this.currentImg = this.imgs[this.index];
        this.acum = 0.0;
    }
    else {
        this.acum += delta;
    }
};

ActiveElement.prototype.render = function(ctx){
    this.currentImg && ctx.drawImage(this.currentImg, this.x, this.y, 1, 1);
};

ActiveElement.prototype.toString = function(){
    return "[" + this.id + ": "+ this.type + " x:" + this.x + " y:" + this.y + "]";
};

