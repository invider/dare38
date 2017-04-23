var _evilSource = {

    frequency: 0.2, // spawns per second average

    evolve: function(delta, scene) {
        if (Math.random() < this.frequency * delta) {
            scene.attach(new Digger(Math.random() * scene.width, 1, scene.root.planet));
        }
    }
};
