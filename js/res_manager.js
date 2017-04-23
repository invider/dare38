/**
 * Created by karnil on 22.04.17.
 */
"use strict"
var _$resManager = {
    img: [],
    sfx: [],
    snd: [],
    loaded: 0,
    expected: 0,

    init: function(scene) {
        this.scene = scene
    },

    done: function() {
        this.loaded++
        if (this.loaded >= this.expected) {
            scene.pause = false;
        }
    },

    onLoad: function() {
        setTimeout( function() {
            _$resManager.done()
        }, Math.random() * 2000)
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
		var audio = new Audio(src)
		audio.preload = true
        this.sfx[name] = audio;
        console.log('loading ' + name + " @" + src)
    }
};
