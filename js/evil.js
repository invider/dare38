var _evilSource = {

    frequency: 0.2, // spawns per second average

    evolve: function(delta, scene) {

        if (
            scene.statistic.diggersToSpawn > scene.statistic.spawnedDiggers &&
            (scene.keys[76] || Math.random() < this.frequency * delta && !scene.gameoverFlag)
        ) {
            delete scene.keys[76];
            scene.statistic.spawnedDiggers ++;
            scene.statistic.diggersAlive ++;
            scene.attach(new Digger(Math.random() * scene.width, 1, scene));
        }
    }
};
