// To get VSCode code suggestions for Canvas Element
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

// Game states
const numOfEnemies = 50;
const enemies = [];
let gameFrame = 0;

// Classes are factory pattern
class Enemy {
  constructor() {
    // Image
    this.image = new Image();
    this.image.src = "imgs/enemy1.png";

    // For sprite
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;

    // For start position
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);

    // Animation states
    this.speed = 10; // Fluster speed
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Between 1 and 4
  }

  update() {
    // Animate flustered movements
    this.x += Math.random() * this.speed - this.speed / 2;
    this.y += Math.random() * this.speed - this.speed / 2;

    // Animate sprite
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

// Generate enemies
for (let i = 0; i < numOfEnemies; i++) {
  enemies.push(new Enemy());
}

// Animation
function animate() {
  // Clear previous frame
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Update and draw enemy
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });

  // Increase game frames
  gameFrame++;

  requestAnimationFrame(animate);
}

animate();
