function Player(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.posColumn0 = column0;
    this.posRow0 = row0;
    this.w = 32;
    this.h = 32;
    this.boxColliderW = 32;
    this.boxColliderH = 32;
    this.vColumn = 0;
    this.vRow = 0;
    this.movingDir = "none";
    this.color = "red";
    this.strokeColor = "black";
    this.immunity = false;
    this.lifes = 3;
    this.score = 0;
    this.maxBombs = 1;
}

Player.prototype.move = function (dt, numRows, numColumns, grid) {
    grid[this.posRow][this.posColumn].layer = 0;
    if (this.posColumn + this.vColumn >= 0 && this.posColumn + this.vColumn < numColumns) {
        if (this.vColumn > 0)
            this.movingDir = "right";
        else if (this.vColumn < 0)
            this.movingDir = "left";
        this.posColumn = this.posColumn + this.vColumn
        this.vColumn = 0;
    }
    if (this.posRow + this.vRow >= 0 && this.posRow + this.vRow < numRows) {
        if (this.vRow < 0)
            this.movingDir = "up";
        else if (this.vRow > 0)
            this.movingDir = "down";
        this.posRow = this.posRow + this.vRow;
        this.vRow = 0;
    }
    if (grid[this.posRow][this.posColumn].layer == 0)
        grid[this.posRow][this.posColumn].layer = 1;
}
Player.prototype.checkCollision = function (grid, numRows, numColumns) {
    if (grid[this.posRow][this.posColumn].layer > 1) {
        console.log(this.posRow, this.posRow);
        if (this.movingDir == "right")
            this.posColumn = this.posColumn - 1;
        else if (this.movingDir == "left")
            this.posColumn = this.posColumn + 1;
        else if (this.movingDir == "up")
            this.posRow = this.posRow + 1;
        else if (this.movingDir == "down")
            this.posRow = this.posRow - 1;
        this.movingDir = "none";
        console.log(this.posRow, this.posRow);
    }
}
Player.prototype.reset = function () {
    //restore the variables to their default value
    this.posColumn = this.x0;
    this.posRow = this.y0;
    this.vColumn = 0;
    this.vRow = 0;
    this.lifes = 3;
    this.score = 0;
    this.maxBombs = 1;
}

Player.prototype.draw = function (ctx, grid) {
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