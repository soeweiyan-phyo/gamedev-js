const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 0;
// To control frame rate
let gameFrame = 0;
const staggerFrames = 2;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(
    playerImage,
    frameX * spriteWidth, // Move along x-axis in sprite sheet
    frameY * spriteHeight, // Move along y-axis in sprite sheet
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  // Control frame rate
  if (gameFrame % staggerFrames === 0) {
    // Move frame
    if (frameX < 6) frameX++;
    else frameX = 0;
  }

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
