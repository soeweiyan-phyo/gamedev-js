// To get VSCode code suggestions for Canvas Element
/** @type {HTMLCanvasElement} */

(
  function () {
    const canvas = document.getElementById("canvas2");
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
        this.image.src = "imgs/enemy2.png";

        // For sprite
        this.spriteWidth = 266;
        this.spriteHeight = 188;

        // Size
        this.sizeRatio = Math.random() * 3 + 1;
        this.width = this.spriteWidth / this.sizeRatio;
        this.height = this.spriteHeight / this.sizeRatio;

        // For start position
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);

        // Animation states
        this.frame = 0; // Sprite frame
        this.speed = Math.random() * 4 + 1; // x-axis move speed
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Between 1 and 4
        this.angle = 0; // Move in y-axis using sin()
        this.angleSpeed = Math.random() * 0.2; // y-axis move speed
        this.curve = Math.random() * 10; // y-axis move range
      }

      update() {
        // Move forward and repeat
        this.x -= this.speed;
        if (this.x + this.width < 0) this.x = canvas.width;

        // Fly up and down
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;

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
  }
)();
