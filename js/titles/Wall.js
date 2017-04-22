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

 this.render = function(ctx, scene) {
 };
 */
var Wall = function () {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.init = function (parentNode, scene) {
    };

    this.evolve = function (delta, scene) {

    };

    this.render = function (ctx, scene) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };
};

