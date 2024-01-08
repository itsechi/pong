export default function game() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: -5,
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

    // check if the ball is moving within the boundaries
    if (ball.y + ball.vy > canvas.height - ball.radius || ball.y + ball.vy < ball.radius) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width - ball.radius || ball.x + ball.vx < ball.radius) {
      ball.vx = -ball.vx;
    }


    // check if the ball is colliding with the paddle
    if (ball.x === 30) {
      if (paddle.y <= ball.y && paddle.y + paddle.height >= ball.y) {
        ball.vy = -ball.vy;
        ball.vx = -ball.vx;
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }
    }

    window.requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top - paddle.height / 2;
    paddle.move(y);
  });

  window.requestAnimationFrame(draw);
}
