function Player(row0, column0) {
    this.posColumn = column0;
    this.posRow = row0;
    this.posColumn0 = column0;
    this.x = column0 * 32;
    this.y = row0 * 32;
    this.posRow0 = row0;
    this.w = 32;
    this.h = 32;
    this.boxColliderW = 32;
    this.boxColliderH = 32;
    this.vColumn = 0;
    this.maxSpeed = 4;
    this.vRow = 0;
    this.movingDir = "none";
    this.color = "red";
    this.strokeColor = "black";
    this.immunity = false;
    this.lastImunity = 0;
    this.life = 3;
    this.score = 0;
    this.maxBombs = 2;
    this.objectsThatCollide = [2, 3, 5];
    this.frame = 0;
    this.walkSoundCD = 0;

}

Player.prototype.move = function (dt, numRows, numColumns, grid) {
    /*
       * Calculates the position on the grid based in the player's X and Y values
    */

    //walking sound
    if (this.vColumn != 0 || this.vRow != 0) {
        if (this.walkSoundCD < 1.5) {
            this.walkSoundCD = this.walkSoundCD + this.walkSoundCD * dt;
        } else {
            assetsManager.play("walk");
            this.walkSoundCD = 1;
        }
    } else
        this.walkSoundCD = 2;
    var r1 = (this.y + this.vRow) % 32;
    var r2 = (this.x + this.vColumn) % 32;
    var newPosRow;
    var newPosColumn;
    var oldPosRow = this.posRow;
    var oldPosColumn = this.posColumn;
    if (r1 >= (this.h * 0.6))
        newPosRow = Math.ceil((this.y + this.vRow) / 32);
    else
        newPosRow = Math.floor((this.y + this.vRow) / 32);
    if (r2 >= (this.w * 0.6))
        newPosColumn = Math.ceil((this.x + this.vColumn) / 32);
    else
        newPosColumn = Math.floor((this.x + this.vColumn) / 32);
    if (newPosColumn >= 0 && newPosColumn < numColumns) {
        if (this.vColumn > 0)
            this.movingDir = "right";
        else if (this.vColumn < 0)
            this.movingDir = "left";
        this.x = this.x + this.vColumn;
        //this.vColumn = 0;
        this.posColumn = newPosColumn;
    }

    if (newPosRow >= 0 && newPosRow < numRows) {
        if (this.vRow < 0)
            this.movingDir = "up";
        else if (this.vRow > 0)
            this.movingDir = "down";
        this.y = this.y + this.vRow;
        //this.vRow = 0;
        this.posRow = newPosRow;
    }
    /*
    * First it frees the current position in the grid and then sets the new one
    */
    if (grid[oldPosRow][oldPosColumn].layer == 1)
        grid[oldPosRow][oldPosColumn].layer = 0;
    if (grid[this.posRow][this.posColumn].layer == 0)
        grid[this.posRow][this.posColumn].layer = 1;
    /*
    * It corrects the X and Y axes after moving 
    */
    if (this.movingDir == "up" || this.movingDir == "down")
        this.x = grid[this.posRow][this.posColumn].x;
    if (this.movingDir == "left" || this.movingDir == "right")
        this.y = grid[this.posRow][this.posColumn].y;
    //updates the imunity
}
Player.prototype.checkCollision = function (grid, numRows, numColumns) {
    for (var i = 0; i < this.objectsThatCollide.length; i++) {
        if (grid[this.posRow][this.posColumn].layer == this.objectsThatCollide[i]) { //wall
            console.log(this.posRow, this.posRow);
            if (this.movingDir == "right")
                this.x = this.x - 16;
            else if (this.movingDir == "left")
                this.x = this.x + 16;
            else if (this.movingDir == "up")
                this.y = this.y + 16;
            else if (this.movingDir == "down")
                this.y = this.y - 16;
            this.movingDir = "none";
            //console.log(this.posRow, this.posRow);
        }
    }
    if ((grid[this.posRow][this.posColumn].layer == 4 || grid[this.posRow][this.posColumn].layer == 6) && !this.immunity) {//enemy
        this.immunity = true;
        this.life--;
        assetsManager.play("hit");
    }
}
Player.prototype.reset = function () {
    //restore the variables to their default value
    this.posColumn = this.posColumn0;
    this.posRow = this.posRow0;
    this.x = this.posColumn * 32;
    this.y = this.posRow * 32;
    this.vColumn = 0;
    this.vRow = 0;
    this.life = 3;
    this.score = 0;
    this.maxBombs = 1;
}

Player.prototype.draw = function (ctx, dt) {
    this.frame += 6 * dt;
    var F = Math.floor(this.frame);
    var key = "player";
    if (this.immunity) {
        key = "player_damaged";
        if (this.lastImunity >= 3) {
            this.lastImunity = 0;
            this.immunity = false;
        } else {
            this.lastImunity = this.lastImunity + dt;
        }
    }
    if (this.movingDir == "down") {
        ctx.drawImage(assetsManager.images[key], (F % 3) * 17, 0, 17, 17, this.x, this.y, this.w, this.h);
    } else if (this.movingDir == "up") {
        ctx.drawImage(assetsManager.images[key], (F % 3) * 17, 34, 17, 17, this.x, this.y, this.w, this.h);

    } else if (this.movingDir == "left") {
        ctx.drawImage(assetsManager.images[key], (F % 3) * 17, 51, 17, 17, this.x, this.y, this.w, this.h);

    } else if (this.movingDir == "right") {
        ctx.drawImage(assetsManager.images[key], (F % 3) * 17, 17, 17, 17, this.x, this.y, this.w, this.h);
    } else {
        ctx.drawImage(assetsManager.images[key], (F % 3) * 17, 68, 17, 17, this.x, this.y, this.w, this.h);
    }
}
