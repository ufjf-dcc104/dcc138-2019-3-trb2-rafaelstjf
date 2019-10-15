var dt = prevTime = 0;
var debug = false; //to see the hit boxes
var inGame = false;
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
var assetsManager = new AssetsManager();
//load images
assetsManager.loadImage("free", "Assets/Sprites/floor.png");
assetsManager.loadImage("desWall", "Assets/Sprites/destructibleWall.png");
assetsManager.loadImage("indesWall", "Assets/Sprites/indestructibleWall.png");
assetsManager.loadImage("portrait", "Assets/Sprites/portrait.png");
assetsManager.loadImage("player", "Assets/Sprites/player_tileset.png");
assetsManager.loadImage("player_damaged", "Assets/Sprites/player_tileset2.png");
assetsManager.loadImage("bomb", "Assets/Sprites/bomb.png");
assetsManager.loadImage("enemy_1", "Assets/Sprites/enemy_1.png");
assetsManager.loadImage("explosion", "Assets/Sprites/explosion.png");
//load audios
assetsManager.loadAudio("walk", "Assets/Sounds/walk.wav");
assetsManager.loadAudio("background", "Assets/Sounds/background.mp3");
assetsManager.loadAudio("hit", "Assets/Sounds/hit.wav");
assetsManager.loadAudio("explosion", "Assets/Sounds/explosion.wav");
assetsManager.loadAudio("spawn_bomb", "Assets/Sounds/spawn_bomb.wav");
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
for (var j = 3; j < numColumns - 5; j++) {
    grid[numRows - 5][j].layer = 3;
}
for (var j = 3; j < numColumns - 5; j++) {
    grid[5][j].layer = 2;
}
//creates enemies
function createEnemies() {
    for (var i = 0; i < 5; i++) {
        var posRow = parseInt(Math.random() * numRows);
        var posCol = parseInt(Math.random() * numColumns);
        while (grid[posRow][posCol].layer > 0) {
            posRow = parseInt(Math.random() * numRows);
            posCol = parseInt(Math.random() * numColumns);
        }
        enemies.push(new Enemy(posRow, posCol));
    }
}

//Grid Functions
function drawGrid() {
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            if (grid[i][j].layer == 2) {
                ctx.drawImage(assetsManager.images["indesWall"], grid[i][j].x, grid[i][j].y, 32, 32);
            } else if (grid[i][j].layer == 3) {
                ctx.drawImage(assetsManager.images["desWall"], grid[i][j].x, grid[i][j].y, 32, 32);
            } else
                ctx.drawImage(assetsManager.images["free"], grid[i][j].x, grid[i][j].y, 32, 32);
            if (debug) {
                ctx.font = "8px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(i + ' : ' + j, grid[i][j].x + 5, grid[i][j].y + 16);
                ctx.fillText(grid[i][j].layer, grid[i][j].x + 5, grid[i][j].y + 30);
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
function drawGameOverScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 32);
    ctx.textAlign = 'center';
    ctx.font = "16px Arial";
    ctx.fillText("PRESS SPACE TO PLAY", canvas.width / 2, canvas.height / 2);
}
function drawHUD() {
    // if(!assetsManager.checkIfIsPlaying("background"))
    //     assetsManager.play("background");
    //draws HUD RECT
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 482, canvas.width, canvas.height - 482);
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 482, canvas.width, canvas.height - 482);
    ctx.lineWidth = 1;
    //Draws HUD text
    //ctx.fillStyle = "red";
    //ctx.fillRect(10, 525, 32, 32);
    ctx.drawImage(assetsManager.images["portrait"], 10, 500, 64, 64);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("x" + player.life, 90, 550);
}
function moveObjects() {
    player.move(dt, numRows, numColumns, grid);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move(dt, numRows, numColumns, grid);
    }
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].behave(dt, grid, numRows, numColumns, assetsManager);
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
    player.draw(ctx, dt);
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
    if (inGame == true) {
        clearCanvas();
        drawHUD();
        dt = (t - prevTime) / 1000;
        moveObjects() //move them first and then check collisions
        checkCollisionObjects();
        drawObjects();
        if (player.life == 0)
            inGame = false;
        prevTime = t;
    } else {
        drawGameOverScreen();
    }
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

addEventListener("keydown", function (e) {

    if (e.keyCode == 37)//left
        player.vColumn = -player.maxSpeed;
    if (e.keyCode == 38)//up
        player.vRow = -player.maxSpeed;
    if (e.keyCode == 39)//right
        player.vColumn = player.maxSpeed;
    if (e.keyCode == 40)//down
        player.vRow = player.maxSpeed;
});
addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 32: //space key
            if (inGame) {
                if (bombs.length < player.maxBombs) {
                    bombs.push(new Bomb(player.posRow, player.posColumn));
                    assetsManager.play("spawn_bomb");
                }
            } else {
                player.reset();
                createEnemies();
                inGame = true;
            }
            break;
        case 37: //left arrow key
            player.vColumn = 0;
            player.movingDir = "none";
            player.frame = 0;
            break;
        case 38: //up arrow key
            player.movingDir = "none";
            player.frame = 0;
            player.vRow = 0;
            break;
        case 39: //right arrow key
            player.movingDir = "none";
            player.frame = 0;
            player.vColumn = 0;
            break;
        case 40: //down arrow key
            player.movingDir = "none";
            player.frame = 0;
            player.vRow = 0;
            break;
        default:
    }
});