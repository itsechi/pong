export default function Ball(canvas, ctx) {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 5,
    vy: 1,
    speed: 7,
    radius: 10,
    color: "white",
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  }
}