var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        hud.updateOf(-9500)
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 800, "y": groundY - 20},
                { "type": "sawblade", "x": 1000, "y": groundY - 155},
                { "type": "sawblade", "x": 2200, "y": groundY - 45},
                { "type": "sawblade", "x": 1200, "y": groundY - 30},
                { "type": "barrel", "x": 1000, "y": groundY - 20},
                { "type": "barrel", "x": 2000, "y": groundY - 20},
                { "type": "barrel", "x": 2400, "y": groundY - 20},
                { "type": "enemy", "x": 1400, "y": groundY - 40, "velX": -2, "velY": 0, "rot": 2},
                { "type": "enemy", "x": 900, "y": groundY - 40, "velX": -2, "velY": -.05, "rot": -.5},
                { "type": "trophy", "x": 2600, "y": groundY - 40}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
        }

        function createBarrel(x, y) {
            var barrelHitZoneSize = 25;
            var damageFromBarrel = 10;
            var barrelHitZone = game.createObstacle(barrelHitZoneSize, damageFromBarrel);
            barrelHitZone.x = x;
            barrelHitZone.y = y;
            game.addGameItem(barrelHitZone);
            var barrelImage = draw.bitmap("img/barrel.png");
            barrelHitZone.addChild(barrelImage);
            barrelImage.x = -25
            barrelImage.y = -25
        }



        function createEnemy (x, y, velX, velY, rot){
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = velX
            enemy.velocityY = velY
            enemy.rotationalVelocity = rot
            game.addGameItem(enemy);
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-15)
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.flyTo(x, -20);
            }
        }


        function createTrophy(x, y){
            var trophy = game.createGameItem("trophy", 25);
            var goldenRectangle = draw.rect(50, 70, "gold");
            goldenRectangle.x = -25;
            goldenRectangle.y = -25;
            trophy.addChild(goldenRectangle);
            trophy.x = x;
            trophy.y = y;
            trophy.velocityX = -2
            game.addGameItem(trophy);
            trophy.onPlayerCollision = function () {
                game.increaseScore(300)
            };
            
        }


        for (var i = 0; i < levelData.gameItems.length; i++) {
            if (levelData.gameItems[i].type === "sawblade") {
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y)
            }
            else if (levelData.gameItems[i].type === "barrel") {
                createBarrel(levelData.gameItems[i].x, levelData.gameItems[i].y)
            }
            else if (levelData.gameItems[i].type === "enemy") {
                createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y, levelData.gameItems[i].velX, levelData.gameItems[i].velY, levelData.gameItems[i].rot)
            }
            else if (levelData.gameItems[i].type === "trophy") {
                createTrophy(levelData.gameItems[i].x, levelData.gameItems[i].y)
            }
            
        }

        

        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
