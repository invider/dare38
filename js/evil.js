var _evilSource = {

    frequency: 0.2, // spawns per second average

    evolve: function(delta, scene) {
        if (scene.keys[76] || Math.random() < this.frequency * delta) {
            delete scene.keys[76];
            scene.attach(new Digger(Math.random() * scene.width, 1, scene));
        }
    }
};
