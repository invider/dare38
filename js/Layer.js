var LayerNode = function() {
    this.nodes = []
}

LayerNode.prototype.init = function(parent, scene) {
    this.parent = parent
    this.scene = scene
}

LayerNode.prototype.attach = function(node) {
    this.nodes.push(node)
    if (node.init) node.init(this, this.scene)
}

LayerNode.prototype.evolve = function(delta, scene) {
    this.nodes.forEach( function(node) {
        node.evolve(delta, scene)
    })
}

LayerNode.prototype.render = function(ctx, scene) {
    this.nodes.forEach( function(node) {
        node.render(ctx, scene)
    })
}

