var _evilSource = {

    frequency: 0.2, // spawns per second average

    evolve: function(delta, scene) {

        if (
            scene.statistic.diggersToSpawn > scene.statistic.spawnedDiggers &&
            (scene.keys[118] || Math.random() / (scene.level * scene.levelRatio + 1) < this.frequency * delta && !scene.gameoverFlag)
        ) {
            delete scene.keys[118];
            scene.statistic.spawnedDiggers ++;
            scene.statistic.diggersAlive ++;

            var digger = new Digger(Math.floor((Math.random() * scene.width-2)) + 1, 0, scene)
            scene.attach(digger)
            scene.root.explode('digger-spawn', digger)
        }
    }
};
