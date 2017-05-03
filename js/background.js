"use strict"

var STAR_FREQ = 1

var _background = {
    stars: [],
    img: [],

    init: function(parent, scene) {
        // pull resources
        this.img.push(scene.res.img['star-blue'])
        this.img.push(scene.res.img['star-red'])
        this.img.push(scene.res.img['star-yellow'])

        for (var i = 0; i < 50; i++) {
            this.newStar(Math.random() * scene.screenWidth)
        }
    },

    newStar: function(x) {
        var star = {
            x: x,
            y: Math.random() * scene.screenHeight,
            img: this.img[Math.floor(Math.random() * 3)],
        }
        switch(Math.floor(Math.random() * 3)) {
        case 0: star.dx = 7; break;
        case 1: star.dx = 15; break;
        case 2: star.dx = 30; break;
        default: star.dx = 200;
        }
        switch(Math.floor(Math.random() * 5)) {
        case 0: star.size = 5; break;
        case 1: star.size = 7; break;
        case 2: star.size = 10; break;
        case 3: star.size = 13; break;
        case 4: star.size = 20; break;
        }

        var placed = false
        this.stars.forEach(function(e) {
            if (e.x > scene.screenWidth+100) {
                e.x = star.x
                e.y = star.y
                e.dx = star.dx
                e.size = star.size
                e.img = star.img
                placed = true
            }
        })
        if (!placed) {
            this.stars.push(star)
        }
    },

    evolve: function(delta, scene) {
        this.stars.forEach(function(star) {
            star.x += star.dx * delta
        })

        if (Math.random() < STAR_FREQ*delta) {
            this.newStar(-100)
        }
    },

    render: function(ctx, scene) {
        ctx.beginPath();
        ctx.rect(0, 0, scene.screenWidth, scene.screenHeight);
        ctx.fillStyle = "#110033"
        ctx.fill();

        ctx.globalAlpha = 0.5
        this.stars.forEach(function(star) {
            ctx.drawImage(star.img, star.x, star.y, star.size, star.size);
        })
        ctx.globalAlpha = 1
    }
}
