class Player {
  constructor() {
    this.size = 50;
    this.x = this.size;
    this.y = height - this.size;
    this.velocityY = 0;
    this.gravity = 2;
  }
  jump() {
    if (this.y == height - this.size) {
      this.velocityY = -35;
    }
  }
  move() {
    this.y = this.y + this.velocityY;
    this.velocityY += this.gravity;
    this.y = constrain(this.y, 0, height - this.size);
  }
  show() {
    fill(0, 255, 0);
    image(playerImage, this.x, this.y, this.size, 50);
  }
  collided(currentObs) {
    let isColliding = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      currentObs.x,
      currentObs.y,
      currentObs.size,
      currentObs.size
    );
    return isColliding;
  }
}
