export default function Paddle(canvas, ctx, x) {
  return {
    x,
    y: canvas.height / 2 - 40,
    height: 80,
    width: 10,
    color: "white",
    score: 0,
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move(y) {
      if (y < 0) this.y = 0;
      else if (y + this.height > canvas.height)
        this.y = canvas.height - this.height;
      else this.y = y;
    },
  };
}
