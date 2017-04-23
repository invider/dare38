/**
 * Created by karnil on 22.04.17.
 */
"use strict"
var _$loaded = 0
var _$resManager = {
    img: [],
    sfx: [],
    snd: [],
    loaded: 0,
    expected: 0,

    onLoad: function() {
        setTimeout( function() {
            _$resManager.loaded++
        }, Math.random() * 4000)
    },

    /**
     @param {string} name
     @param {string} src
     */
    loadImg: function(name, src) {
        this.expected++
        var image = new Image()
        image.src = src
        image.onload = this.onLoad
        this.img[name] = image;
        console.log('loading ' + name + " @" + src)
    },

    loadSfx: function(name, src) {
        console.log('loading ' + name + " @" + src)
    }
};
