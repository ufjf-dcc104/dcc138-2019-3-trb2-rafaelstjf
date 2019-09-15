var dt = prevTime = 0;
var debug = true; //to see the hit boxes
var inGame = true;
var maxSpeed = 200;
var canvasPartition = 4;
var grid = [];
var numColumns = 640 / 32;
var numRows = 480 / 32;
var highScore = 0;
var level = 0;
var enemies = [];
var bombs = [];
var player = new Player(1, 1); //creates the player's object
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
//build grid
for (var i = 0; i < numRows; i++) {
    grid[i] = [];
}
for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numColumns; j++) {
        coordinates = {
            x: j * 32,
            y: i * 32,
            layer: 0
        };
        grid[i][j] = coordinates;
    }
}
for (var j = 0; j < numColumns; j++) {
    grid[numRows - 1][j].layer = 2;
    grid[0][j].layer = 2;
}
for (var i = 0; i < numRows; i++) {
    grid[i][numColumns - 1].layer = 2;
    grid[i][0].layer = 2;
}
//creates enemies
for (var i = 0; i < 2; i++) {
    enemies.push(new Enemy(parseInt(Math.random() * numRows), parseInt(Math.random() * numColumns)));
}

//Grid Functions
function drawGrid() {
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (grid[i][j].layer >= 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(grid[i][j].x, grid[i][j].y, 32, 32);
                ctx.strokeStyle = "gray";
                ctx.strokeRect(grid[i][j].x, grid[i][j].y, 32, 32);
            } else {

                ctx.strokeStyle = "black";
                ctx.strokeRect(grid[i][j].x, grid[i][j].y, 32, 32);
            }
        }
    }
}

//general functions
function clearCanvas() {
    //clear the canvas
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}
function moveObjects() {
    player.move(dt, numRows, numColumns, grid);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(dt, numRows, numColumns, grid);
    }
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].behave(dt, grid, numRows, numColumns);
        if (bombs[i].explosionComplete) {
            bombs.splice(i, 1);
        }
    }
}
function drawObjects() {
    drawGrid();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw(ctx, grid);
    }
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].draw(ctx, grid, numRows, numColumns);
    }
    player.draw(ctx, grid);
}

function drawHUD() {
    //draws HUD RECT
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 482, canvas.width, canvas.height - 482);
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 482, canvas.width, canvas.height - 482);
    ctx.lineWidth = 1;
    //Draws HUD text
    ctx.fillStyle="red";
    ctx.fillRect(10,525, 32, 32);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("x" + player.life, 50, 550);
}
function checkCollisionObjects() {
    player.checkCollision(grid, numRows, numColumns);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].checkCollision(grid, numRows, numColumns);
        if (!enemies[i].alive)
            enemies.splice(i, 1);
    }
    for (var i = 0; i < bombs.length; i++) {
        if (bombs[i].explosionComplete) {
            bombs.splice(i, 1);
        }
    }
}
function loop(t) {
    clearCanvas();
    drawHUD();
    if (inGame == true) {
        dt = (t - prevTime) / 1000;
        moveObjects() //move them first and then check collisions
        checkCollisionObjects();
        drawObjects();
        prevTime = t;
    }
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

addEventListener("keydown", function (e) {

    if (e.keyCode == 37)
        player.vColumn = -3;
    if (e.keyCode == 38)
        player.vRow = -3;
    if (e.keyCode == 39)
        player.vColumn = 3;
    if (e.keyCode == 40)
        player.vRow = 3;
    /*
    switch (e.keyCode) {
        case 37: //left arrow key
            player.vColumn = -3;
            break;
        case 38: //up arrow key
            player.vRow = -3;
            break;
        case 39: //right arrow key
            player.vColumn = 3;
            break;
        case 40: //down arrow key
            player.vRow = 3;
            break;
        default:
    }
    */
});
addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 32: //space key
            if (bombs.length < player.maxBombs) {
                bombs.push(new Bomb(player.posRow, player.posColumn));
            }
            break;
        case 37: //left arrow key
            player.vColumn = 0;
            player.movingDir = "none";
            break;
        case 38: //up arrow key
            player.movingDir = "none";
            player.vRow = 0;
            break;
        case 39: //right arrow key
            player.movingDir = "none";
            player.vColumn = 0;
            break;
        case 40: //down arrow key
            player.movingDir = "none";
            player.vRow = 0;
            break;
        default:
    }
});