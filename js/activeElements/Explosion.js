var Explosion = function(x, y, lifespan, force) {
    this.lifespan = lifespan
    this.x = x
    this.y = y

    this.alive = true
    this.potential = 0
    this.force = force
    this.frequency = 1/this.force
    this.particles = []

    this.rnd = function(n) {
        return Math.random() * n
    }

    this.Particle = function(x, y, speed, angle, lifespan) {
        this.alive = true
        this.r = 1
        this.gr = -this.r
        this.x = x
        this.y = y
        this.speed = speed
        this.angle = angle
        this.dx = Math.cos(angle) * speed
        this.dy = Math.sin(angle) * speed
        this.lifespan = lifespan
        this.maxspan = lifespan
        this.fadespan = this.lifespan/4

        this.mutate = function(delta) {
            this.lifespan -= delta
            if (this.lifespan < 0) this.alive = false

            // movement
            this.x += this.dx * delta
            this.y += this.dy * delta
        }

        this.render = function(ctx) {
            // draw particle
            if (this.lifespan < this.fadespan) {
                ctx.globalAlpha = this.lifespan/this.fadespan
            } else {
                ctx.globalAlpha = 1
            }
            ctx.drawImage(scene.res.img['shot-2'], this.x, this.y, this.r, this.r);
        }
    }

    this.createParticle = function() {
        var p = new this.Particle(
                this.x + 2 - this.rnd(2),
                this.y-this.rnd(2),
                1 + this.rnd(4),                // speed
                //Math.PI + this.rnd(Math.PI),  // up
                this.rnd(Math.PI * 2),          // all directions
                2+this.rnd(4),                  // lifespan
                )
        p.r = 0.2+this.rnd(0.4)
        return p
    }

    this.spawn = function() {
        var p = this.createParticle()
        // find a slot
        var placed = false
        for (var i = 0; i < this.particles.length; i++) {
           if (!this.particles[i].alive) {
               this.particles[i] = p
               placed = true
               break;
           }
        }
        if (!placed) this.particles.push(p)
    }
}

Explosion.prototype.init = function(parent, scene) {
}

Explosion.prototype.evolve = function(delta, scene) {
    if (this.lifespan > 0) {
        this.lifespan -= delta
        if (this.lifespan < 0) this.lifespan = 0
    }

    // emitting
    this.potential += delta
    while (this.lifespan !== 0 && this.potential >= this.frequency) {
        this.potential -= this.frequency
        this.spawn()
    }

    // mutating particles
    var pn = 0
    this.particles.map( function(p) {
        if (p.alive) {
            pn++
            p.mutate(delta)
        }
    })

    if (pn === 0 && this.lifespan === 0) {
        scene.root._killNode(this)
    }
}

Explosion.prototype.render = function(ctx, scene) {
    ctx.save()
    var i = 0
    this.particles.map( function(p) {
        i++
        if (p.alive) p.render(ctx)
    })
    ctx.restore()
}
