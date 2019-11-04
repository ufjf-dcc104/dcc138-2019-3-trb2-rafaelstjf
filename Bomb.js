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
    this.maxTickAE = 0.5;
    this.currentTick = 0;
    this.readyToExplode = false;
    this.explosionComplete = false;
    this.positionsToExplode = [];
    this.frame = 0;
}
Bomb.prototype.calcPosToExplode = function (grid, numRows, numColumns) {
    /*
    *  checks if the +3 positions of each side (up, down, left and right) aren't indestructible walls,
    * then mark them to explode
    */
    for (var i = 0; i < 3; i++) {
        if (this.posRow + i < numRows && this.posRow + i >= 0 && grid[this.posRow + i][this.posColumn].layer != 2) {
            this.positionsToExplode.push({ row: this.posRow + i, column: this.posColumn });
        }
        else break;
    }
    for (var i = 0; i < 3; i++) {
        if (this.posRow - i < numRows && this.posRow - i >= 0 && grid[this.posRow - i][this.posColumn].layer != 2) {
            this.positionsToExplode.push({ row: this.posRow - i, column: this.posColumn });
        } else break;
    }
    for (var i = 0; i < 3; i++) {
        if (this.posColumn - i < numColumns && this.posColumn - i >= 0 && grid[this.posRow][this.posColumn - i].layer != 2) {
            this.positionsToExplode.push({ row: this.posRow, column: this.posColumn - i });
        } else break;
    }
    for (var i = 0; i < 3; i++) {
        if (this.posColumn + i < numColumns && this.posColumn + i >= 0 && grid[this.posRow][this.posColumn + i].layer != 2) {
            this.positionsToExplode.push({ row: this.posRow, column: this.posColumn + i });
        } else break;
    }
}
Bomb.prototype.behave = function (dt, grid, numRows, numColumns, asssetsManager) {
    this.frame += 6 * dt;
    if (!this.explosionComplete) {
        //placed the bomb and the explosion haven't occurred yet
        if (this.currentTick >= this.maxTick && !this.readyToExplode) {
            this.readyToExplode = true;
            this.frame = 0;
            assetsManager.play("explosion");
            this.calcPosToExplode(grid, numRows, numColumns);
            for (var i = 0; i < this.positionsToExplode.length; i++) {
                grid[this.positionsToExplode[i].row][this.positionsToExplode[i].column].layer = 6;
            }
            this.currentTick = 0;
            this.color = "red";
        } else if (this.currentTick < this.maxTick && !this.readyToExplode) {
            this.currentTick = this.currentTick + dt;
            if (grid[this.posRow][this.posColumn].layer == 0) //1 second to move
                grid[this.posRow][this.posColumn].layer = 5;
            if (this.currentTick >= 2 && this.currentTick < 3)
                this.color = "orange";
        } else if (this.currentTick < this.maxTickAE && this.readyToExplode) {
            //now the bomb has exploded but the damage stills on
            this.currentTick = this.currentTick + dt;
        } else if (this.currentTick >= this.maxTickAE && this.readyToExplode) {
            this.readyToExplode = false;
            this.explosionComplete = true;
            for (var i = 0; i < this.positionsToExplode.length; i++) {
                grid[this.positionsToExplode[i].row][this.positionsToExplode[i].column].layer = 0;
            }
        }
    }
}
Bomb.prototype.draw = function (ctx, grid, numRows, numColumns) {

    var F = Math.floor(this.frame);
    if (this.readyToExplode) {
        for (var i = 0; i < this.positionsToExplode.length; i++) {
            ctx.drawImage(
                assetsManager.images["explosion"],
                (F % 27) * 35,
                0,
                35,
                43,
                grid[this.positionsToExplode[i].row][this.positionsToExplode[i].column].x,
                grid[this.positionsToExplode[i].row][this.positionsToExplode[i].column].y,
                this.w,
                this.h
            );
        }
    } else {
        ctx.drawImage(
            assetsManager.images["bomb"],
            (F % 3) * 16,
            0,
            16,
            16,
            grid[this.posRow][this.posColumn].x,
            grid[this.posRow][this.posColumn].y,
            this.w,
            this.h
        );
    }
    /*
    ctx.save();
    ctx.translate(this.posColumn * 32, this.posRow * 32);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
    */
}