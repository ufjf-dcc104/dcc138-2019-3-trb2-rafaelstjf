function Enemy(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.posColumn0 = column0;
    this.posRow0 = row0;
    this.w = 32;
    this.h = 32;
    this.boxColliderW = 32;
    this.boxColliderH = 32;
    this.vColumn = 1;
    this.vRow = 1;
    this.movingDir = "none";
    this.color = "yellow";
    this.strokeColor = "black";
    this.score = 0;
    this.movespeed = 1;
    this.lastMoved = 0;
}

Enemy.prototype.move = function (dt, numRows, numColumns, grid) {

    if (this.lastMoved < this.movespeed) {
        this.lastMoved = this.lastMoved + dt;
    } else {
        this.lastMoved = 0;
        if (this.posColumn + this.vColumn >= 0 && this.posColumn + this.vColumn < numColumns) {
            if (this.vColumn > 0)
                this.movingDir = "right";
            else if (this.vColumn < 0)
                this.movingDir = "left";
            this.posColumn = this.posColumn + this.vColumn
        }
        if (this.posRow + this.vRow >= 0 && this.posRow + this.vRow < numRows) {
            if (this.vRow < 0)
                this.movingDir = "up";
            else if (this.vRow > 0)
                this.movingDir = "down";
            this.posRow = this.posRow + this.vRow;
        }
    }
}
Enemy.prototype.checkCollision = function (grid, numRows, numColumns) {
    if (grid[this.posRow][this.posColumn].layer > 0) {
        if (this.vx > 0) {
            this.posColumn = this.posColumn - 1;
            this.vx = -this.vx;
            this.x = this.x - 1;
        }
        else if (this.vx < 0) {
            this.posColumn = this.posColumn + 1;
            this.vx = -this.vx;
            this.x = this.x + 1;

        }
        else if (this.vy < 0) {
            this.posRow = this.posRow + 1;
            this.vy = -this.vy;
            this.y = this.y + 1;

        }
        else if (this.vy > 0) {
            this.posRow = this.posRow - 1;
            this.vy = -this.vy;
            this.y = this.y - 1;
        }
    }
}
Enemy.prototype.reset = function () {
    //restore the variables to their default value
    this.posColumn = this.x0;
    this.posRow = this.y0;
    this.vColumn = 0;
    this.vRow = 0;
    this.lifes = 3;
    this.score = 0;
    this.maxBombs = 1;
}

Enemy.prototype.draw = function (ctx, grid) {
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