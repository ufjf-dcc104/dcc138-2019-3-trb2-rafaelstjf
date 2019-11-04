/*
------------Grid Codes----------------
0 - Free
1 - Player
2 - Indestructible wall
3 - Destructible wall
4 - Enemies
5 - Bombs
6 - Bomb activated
7 - Power-ups
*/
function Grid(canvasWidth, canvasHeight, cellWidth, cellHeight) {
    this.cellHeight = cellHeight;
    this.cellWidth = cellWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.numRows = Math.floor(canvasHeight / cellHeight);
    this.numColumns = Math.floor(canvasWidth / cellWidth);
    this.cellsArray = [];
    this.debug = false;
    for (var i = 0; i < numRows; i++) {
        cellsArray[i] = [];
        for (var j = 0; j < numColumns; j++) {
            coordinates = {
                x: j * 32,
                y: i * 32,
                layer: 0
            };
            cellsArray[i][j] = coordinates;
        }
    }
}

Grid.prototype.draw = function (ctx) {
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (cellsArray[i][j].layer == 2) {
                ctx.drawImage(assetManager.images["indesWall"], cellsArray[i][j].x , cellsArray[i][j].y, 32, 32);
            } else if (cellsArray[i][j].layer == 0) {
                ctx.drawImage(assetManager.images["free"], cellsArray[i][j].x , cellsArray[i][j].y, 32, 32);
            } else if (cellsArray[i][j].layer == 3) {
                ctx.drawImage(assetManager.images["desWall"], cellsArray[i][j].x , cellsArray[i][j].y, 32, 32);
            } else if (cellsArray[i][j].layer == 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(cellsArray[i][j].x, cellsArray[i][j].y, 32, 32);
            }
            if (debug) {
                ctx.font = "8px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(i + ' : ' + j, cellsArray[i][j].x + 5, cellsArray[i][j].y + 16);
                ctx.fillText(cellsArray[i][j].layer, cellsArray[i][j].x + 5, cellsArray[i][j].y + 30);
            }
        }
    }
}

Grid.prototype.buildFromMatrix = function (matrix) {
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            cellsArray[i][j].layer = matrix[i][j];
        }
    }
}