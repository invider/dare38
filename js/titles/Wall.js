/**
 * Created by shaddy on 22.04.17.
 */
/*
 this.x=0
 this.y=0;
 this.init = function(parentNode, scene){
 };

 this.evolve=function(delta, scene) {
 };

 this.stroke = function(v){
 }
 this.render = function(ctx, scene) {
 };
 */

var Wall = function () {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.hp = 100;
    this.init = function (parentNode, scene) {
        this.scene = scene;
    };

    this.evolve = function (delta, scene) {

    };

    this.stroke = function(v){
        this.hp -= v;
        console.log("Ooooh, you have broke the wall, so what you are going to do in neibouring cell?");
        this.scene.planet.removeNode(this);
        return this.hp >= 0;
    };

    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };
};

