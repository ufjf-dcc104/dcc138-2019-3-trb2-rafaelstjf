function Enemy(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.posColumn0 = column0;
    this.posRow0 = row0;
    this.w = 32;
    this.h = 32;
    this.boposColumnColliderW = 32;
    this.boposColumnColliderH = 32;
    this.vColumn = 1;
    this.vRow = 1;
    this.movingDir = "none";
    this.color = "pink";
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
    if (grid[this.posRow][this.posColumn].layer > 2) {
        if (this.vColumn > 0) {
            this.posColumn = this.posColumn - 1;
            this.vColumn = -this.vColumn;
        }
        else if (this.vColumn < 0) {
            this.posColumn = this.posColumn + 1;
            this.vColumn = -this.vColumn;

        }
        else if (this.vRow < 0) {
            this.posRow = this.posRow + 1;
            this.vRow = -this.vRow;

        }
        else if (this.vRow > 0) {
            this.posRow = this.posRow - 1;
            this.vRow = -this.vRow;
        }
    }
}
Enemy.prototype.reset = function () {
    //restore the variables to their default value
    this.posColumn = this.posColumn0;
    this.posRow = this.posColumn0;
    this.vColumn = 0;
    this.vRow = 0;
    this.lifes = 3;
    this.score = 0;
    this.maposColumnBombs = 1;
}

Enemy.prototype.draw = function (ctposColumn, grid) {
    ctposColumn.fillStyle = this.color;
    ctposColumn.fillRect(grid[this.posRow][this.posColumn].x, grid[this.posRow][this.posColumn].y, this.w, this.h);
    /*
    ctposColumn.save();
    ctposColumn.translate(this.posColumn * 32, this.posRow * 32);
    ctposColumn.fillStposColumnle = this.color;
    ctposColumn.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctposColumn.restore();
    */
}