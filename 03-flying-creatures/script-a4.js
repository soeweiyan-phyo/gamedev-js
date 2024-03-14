// To get VSCode code suggestions for Canvas Element
/** @type {HTMLCanvasElement} */

(
  function () {
    const canvas = document.getElementById("canvas4");
    const ctx = canvas.getContext("2d");

    CANVAS_WIDTH = canvas.width = 500;
    CANVAS_HEIGHT = canvas.height = 1000;

    // Game states
    const numOfEnemies = 20;
    const enemies = [];
    let gameFrame = 0;

    // Classes are factory pattern
    class Enemy {
      constructor() {
        // Image
        this.image = new Image();
        this.image.src = "imgs/enemy4.png";

        // For sprite
        this.spriteWidth = 213;
        this.spriteHeight = 213;

        // Size
        this.sizeRatio = Math.random() * 3 + 1;
        this.width = this.spriteWidth / this.sizeRatio;
        this.height = this.spriteHeight / this.sizeRatio;

        // For position
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);

        // Animation states
        this.frame = 0; // Sprite frame
        this.frameSpeed = Math.floor(Math.random() * 3 + 1); // Between 1 and 4
        this.interval = Math.floor(Math.random() * 200 + 50);
      }

      update() {
        // Every 30 game frames, generate new random position
        if (gameFrame % this.interval == 0) {
          this.newX = Math.random() * (canvas.width - this.width);
          this.newY = Math.random() * (canvas.height - this.height);
        }

        // Distance between the coordinates
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        // Move to new position
        this.x -= dx / 20;
        this.y -= dy / 20;

        if (this.x + this.width < 0) this.x = canvas.width;

        // Animate sprite
        if (gameFrame % this.frameSpeed === 0) {
          this.frame === 5 ? (this.frame = 0) : this.frame++;
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
  }
)();
