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
    this.maxTick2 = 1;
    this.currentTick = 0;
    this.readyToExplode = false;
    this.explosionDone = false;
}

Bomb.prototype.behave = function (dt, grid, numRows, numColumns) {
    if (!this.explosionDone) {
        if (this.currentTick >= this.maxTick && !this.readyToExplode) {
            this.readyToExplode = true;
            for (var i = 0; i < 3; i++) {
                if (this.posRow + i < numRows && this.posRow + i >= 0)
                    grid[this.posRow + i][this.posColumn].layer = 6;
                if (this.posRow - i < numRows && this.posRow - i >= 0)
                    grid[this.posRow - i][this.posColumn].layer = 6;
                if (this.posColumn - i < numRows && this.posColumn - i >= 0)
                    grid[this.posRow][this.posColumn - i].layer = 6;
                if (this.posColumn + i < numRows && this.posColumn + i >= 0)
                    grid[this.posRow][this.posColumn + i].layer = 6;
            }
            this.currentTick = 0;
            this.color = "red";
        } else if (this.currentTick < this.maxTick && !this.readyToExplode) {
            this.currentTick = this.currentTick + dt;
            if (this.currentTick >= 2 && this.currentTick < 3)
                this.color = "orange";
        } else if (this.currentTick < this.maxTick2 && this.readyToExplode) {
            this.currentTick = this.currentTick + dt;
        } else if (this.currentTick >= this.maxTick2 && this.readyToExplode) {
            this.readyToExplode = false;
            this.explosionDone = true;
            for (var i = 0; i < 3; i++) {
                if (this.posRow + i < numRows && this.posRow + i >= 0)
                    grid[this.posRow + i][this.posColumn].layer = 0;
                if (this.posRow - i < numRows && this.posRow - i >= 0)
                    grid[this.posRow - i][this.posColumn].layer = 0;
                if (this.posColumn - i < numRows && this.posColumn - i >= 0)
                    grid[this.posRow][this.posColumn - i].layer = 0;
                if (this.posColumn + i < numRows && this.posColumn + i >= 0)
                    grid[this.posRow][this.posColumn + i].layer = 0;
            }
        }
    }
}
Bomb.prototype.draw = function (ctx, grid, numRows, numColumns) {

    ctx.fillStyle = this.color;
    ctx.fillRect(grid[this.posRow][this.posColumn].x, grid[this.posRow][this.posColumn].y, this.w, this.h);
    if (this.readyToExplode) {
        for (var i = 0; i < 3; i++) {
            if (this.posRow + i < numRows && this.posRow + i >= 0)
                ctx.fillRect(grid[this.posRow + i][this.posColumn].x, grid[this.posRow + i][this.posColumn].y, this.w, this.h);
            if (this.posRow - i < numRows && this.posRow - i >= 0)
                ctx.fillRect(grid[this.posRow - i][this.posColumn].x, grid[this.posRow - i][this.posColumn].y, this.w, this.h);
            if (this.posColumn - i < numColumns && this.posColumn - i >= 0)
                ctx.fillRect(grid[this.posRow][this.posColumn - i].x, grid[this.posRow][this.posColumn - i].y, this.w, this.h);
            if (this.posColumn + i < numColumns && this.posColumn + i >= 0)
                ctx.fillRect(grid[this.posRow][this.posColumn + i].x, grid[this.posRow][this.posColumn + i].y, this.w, this.h);
        }
    }
    /*
    ctx.save();
    ctx.translate(this.posColumn * 32, this.posRow * 32);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
    */
}