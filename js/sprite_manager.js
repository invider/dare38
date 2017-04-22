/**
 * Created by karnil on 22.04.17.
 */
var _$SpriteManager = {
    images: [],
    counter: 0,

    /**
     @param {string} img_src
     @param {string} image_name
     */
    addSprite: function(img_src, image_name) {
        var self = this;
        var image = new Image();
        if(!img_src) throw new Error("Something went wrong while image was loading");
        image.src = img_src;
        image.onload = function() {
            self.counter += 1;
        };
        this.images[image_name] = image;
    },
    /**
     @param {string} image_name
     @return {Image}
     */
    getSprite: function(image_name) {
        return this.images[image_name];
    }
};