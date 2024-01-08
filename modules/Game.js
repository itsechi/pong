export default function game() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 10,
    color: "white",
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  };

  const paddle = {
    x: 10,
    y: 20,
    width: 10,
    height: 80,
    color: "#535bf2",
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move(y) {
      if (y < 0) this.y = 0;
      else if (y + this.height > canvas.height) this.y = 420;
      else this.y = y;
    },
  };

  const net = {
    x: canvas.width / 2,
    y: canvas.height,
    color: "white",
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, 0);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
    },
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    net.draw();

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }

    window.requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top - (paddle.height / 2);
    paddle.move(y);
  });

  window.requestAnimationFrame(draw);
}
