var _evilSource = {

    frequency: 1,

    evolve: function(delta, scene) {
        if (Math.random() < this.frequency * delta) {
            scene.attach(new Digger(Math.random() * scene.width, 1, scene.root.planet));
        }
    }
};
