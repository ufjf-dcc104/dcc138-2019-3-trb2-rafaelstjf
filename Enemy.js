function Enemy(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.posColumn0 = column0;
    this.posRow0 = row0;
    this.w = 32;
    this.h = 32;
    this.x = this.posColumn * 32;
    this.y = this.posRow * 32;
    this.boxColumnColliderW = 32;
    this.boxColumnColliderH = 32;
    this.vColumn = 1;
    this.vRow = 1;
    this.movingDir = "none";
    this.color = "pink";
    this.strokeColor = "black";
    this.score = 0;
    this.alive = true;
}

Enemy.prototype.move = function (dt, numRows, numColumns, grid) {
    /*
    * Calculates the position on the grid based in the player's X and Y values
   */
    var r1 = (this.y + this.vRow) % 32;
    var r2 = (this.x + this.vColumn) % 32;
    var newPosRow;
    var newPosColumn;
    var oldPosRow = this.posRow;
    var oldPosColumn = this.posColumn;
    if (r1 >= this.h / 2)
        newPosRow = Math.ceil((this.y + this.vRow) / 32);
    else
        newPosRow = Math.floor((this.y + this.vRow) / 32);
    if (r2 >= this.w / 2)
        newPosColumn = Math.ceil((this.x + this.vColumn) / 32);
    else
        newPosColumn = Math.floor((this.x + this.vColumn) / 32);
        
        if (newPosColumn >= 0 && newPosColumn < numColumns) {
        if (this.vColumn > 0)
        this.movingDir = "right";
        else if (this.vColumn < 0)
        this.movingDir = "left";
        this.x = this.x + this.vColumn
        this.posColumn = newPosColumn;
    }
    if (newPosRow >= 0 && newPosRow < numRows) {
        if (this.vRow < 0)
        this.movingDir = "up";
        else if (this.vRow > 0)
            this.movingDir = "down";
            this.y = this.y + this.vRow;
            this.posRow = newPosRow;
    }
    /*
    * First it frees the current position in the grid and then sets the new one
    */
    if (grid[oldPosRow][oldPosColumn].layer == 4)
    grid[oldPosRow][oldPosColumn].layer = 0;
    if (grid[this.posRow][this.posColumn].layer == 0 || grid[this.posRow][this.posColumn].layer == 1)
        grid[this.posRow][this.posColumn].layer = 4;
    /*
    * It corrects the X and Y axes after moving 
    */
    if (this.movingDir == "up" || this.movingDir == "down")
        this.x = grid[this.posRow][this.posColumn].x;
    if (this.movingDir == "left" || this.movingDir == "right")
        this.y = grid[this.posRow][this.posColumn].y;
}
Enemy.prototype.checkCollision = function (grid, numRows, numColumns) {
    if ((grid[this.posRow][this.posColumn].layer >= 2 && grid[this.posRow][this.posColumn].layer <= 3) || (grid[this.posRow][this.posColumn].layer == 5)) {
        if (this.vColumn > 0) {
            this.posColumn = this.posColumn - 1;
            this.vColumn = -this.vColumn;
        }
        else if (this.vColumn < 0) {
            this.posColumn = this.posColumn + 1;
            this.vColumn = -this.vColumn;

        }
        if (this.vRow < 0) {
            this.posRow = this.posRow + 1;
            this.vRow = -this.vRow;

        }
        else if (this.vRow > 0) {
            this.posRow = this.posRow - 1;
            this.vRow = -this.vRow;
        }
    } if (grid[this.posRow][this.posColumn].layer == 6) {
        this.alive = false;
    }
}
Enemy.prototype.draw = function (ctposColumn, grid) {
    ctposColumn.fillStyle = this.color;
    ctposColumn.fillRect(this.x, this.y, this.w, this.h);
}