// Enemies our player must avoid
let Enemy = function(xCoordinates, yCoordinates, width, height, speed) {
  this.sprite = 'images/enemy-bug-cropped.png';
  this.x = xCoordinates;
  this.y = yCoordinates;
  this.width = width;
  this.height = height;
  this.speed = speed;
};

// Update the enemy's position, check if collision occured
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x >= -80 && this.x <= 480) {
    this.x += (dt * this.speed);
  }
  else {
    this.x = -80;
  }

  this.checkCollisions();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Collision detection logic from html5 gamer
// http://blog.sklambert.com/html5-canvas-game-2d-collision-detection
Enemy.prototype.checkCollisions = function() {
  // Adjustment of 30 is added to overcome empty gaps in the images
  if (player.x + 30 < this.x + 100  && player.x + 80  > this.x + 30
    && player.y + 30 < this.y + 90 && player.y + 110 > this.y + 30) {
      player.reset();
    }
}

// Our player which should beat the enemies and reach water
let Player = function(xCoordinates, yCoordinates, width, height, horizontalStep, verticalStep) {
  this.sprite = 'images/char-princess-girl-cropped.png';
  this.x = xCoordinates;
  this.y = yCoordinates;
  this.width = width;
  this.height = height;
  this.horStep = horizontalStep;
  this.verStep = verticalStep;
};

// Check if player reaches water
Player.prototype.update = function() {
  if (this.y == 0) {
    won.innerText = 'You won, congrats!';
    this.reset();
  }
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Handler for key input
// Parameter: direction, a direction in which player should move
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    // Player should not cross the screen in any direction
    case 'left':
    if (this.x > 12 && this.x <= 412) {
      this.x -= this.horStep;
    }
    break;

    case 'up':
    if (this.y > 0 && this.y <= 450) {
      this.y -= this.verStep;
    }
    break;

    case 'right':
    if (this.x >= 12 && this.x < 412) {
      this.x += this.horStep;
    }
    break;

    case 'down':
    if (this.y >= 0 && this.y < 450) {
      this.y += this.verStep;
    }
    break;

    default:
    break;
  }
};

// Relocate player to initial location
Player.prototype.reset = function() {
  this.x = 212;
  this.y = 450;
}

// Array of Enemy instances
let allEnemies = [
  new Enemy(-80, 170, 100, 90, 120),
  new Enemy(-80, 200, 100, 90, 75),
  new Enemy(-80, 110, 100, 90, 90),
  new Enemy(-80, 300, 100, 90, 150)
];

// Player instance
let player = new Player(212, 450, 80, 110, 100, 90);

let won = document.createElement('h1');
document.body.appendChild(won);

// Event listener for key presses
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // Clear winning text whenever key is pressed
  won.innerText = '';

  player.handleInput(allowedKeys[e.keyCode]);
});
