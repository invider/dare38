var _evilSource = {

    frequency: 0.001,

    evolve: function(delta, scene) {
        if (Math.random() * delta < this.frequency) {
            scene.attach(new Digger(Math.random() * scene.width, 1, scene.root.planet));
        }
    }
};
