var LayerNode = function() {
    this.visible = true
    this.paused = false
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

LayerNode.prototype._killNode = function(node) {
    //
    //  TODO: optimize this
    //
    var counter = 0;
    while (counter < this.nodes.length){
        if (this.nodes[counter] == node){
            this.nodes.splice(counter, 1);
            counter --;
            if (node.kill) node.kill();
        }
        counter ++;
    }
}

LayerNode.prototype.evolve = function(delta, scene) {
    if (this.paused) return;
    this.nodes.forEach( function(node) {
        node.evolve(delta, scene)
    })
}

LayerNode.prototype.render = function(ctx, scene) {
    if (!this.visible) return;
    this.nodes.forEach( function(node) {
        node.render(ctx, scene)
    })
}

