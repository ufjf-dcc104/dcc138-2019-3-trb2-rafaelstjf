function Bomb(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.w = 32;
    this.h = 32;
    this.boxColliderW = 32;
    this.boxColliderH = 32;
    this.color = "yellow";
    this.strokeColor = "black";
    this.maxTick = 3;
    this.currentTick = 0;
    this.readyToExplode = false;
}

Bomb.prototype.behave = function (dt) {
    if (this.currentTick >= this.maxTick) {
        this.readyToExplode = true;
        this.currentTick = 0;
        this.color = "red";
    } else {
        this.currentTick = this.currentTick + dt;
        if (this.currentTick >= 2 && this.currentTick < 3)
            this.color = "orange";
    }
}
Bomb.prototype.draw = function (ctx, grid) {

    ctx.fillStyle = this.color;
    ctx.fillRect(grid[this.posRow][this.posColumn].x, grid[this.posRow][this.posColumn].y, this.w, this.h);
    /*
    ctx.save();
    ctx.translate(this.posColumn * 32, this.posRow * 32);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
    */
}