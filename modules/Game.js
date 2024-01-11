export default function game() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ball = {
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
  };

  const userPaddle = {
    x: 10,
    y: 20,
    width: 10,
    height: 80,
    color: "#535bf2",
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

  const computerPaddle = {
    x: canvas.width - 20,
    y: 20,
    width: 10,
    height: 80,
    color: "#535bf2",
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

  function resetBall() {
    ball.speed = 7;
    ball.vx = 5;
    ball.vy = 1;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }

  function calculateAngle(paddle) {
    // check where the ball hits the paddle
    let collidePoint = ball.y - (paddle.y + paddle.height / 2); // ball.y > paddle height in half = hit the bottom, ball.y < paddle = hit the top, else hit center
    collidePoint = collidePoint / (paddle.height / 2); // normalize the value to get a number between -1 and 1, if it hit the bottom paddle the number will be positive, if top - negative

    // top of the paddle = -45, center = 0, bottom = 45
    let angle = (Math.PI / 4) * collidePoint; // Math.PI / 4 = 45degrees, this returns the radians

    // change the X and Y velocity direction
    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1; // checks if the ball is on the left or right side of the canvas
    ball.vx = Math.floor(direction * ball.speed * Math.cos(angle));
    ball.vy = Math.floor(ball.speed * Math.sin(angle));
    // speed up the ball to increase difficulty
    ball.speed += 0.2;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    userPaddle.draw();
    ball.draw();
    net.draw();
    computerPaddle.draw();

    ball.x += ball.vx;
    ball.y += ball.vy;

    const amountToMove =
      computerPaddle.y +
      Math.floor(
        (ball.y - (computerPaddle.y + computerPaddle.height / 2)) * 0.1
      );
    computerPaddle.move(amountToMove);

    // bounce the ball off the top and bottom walls
    if (
      ball.y + ball.vy > canvas.height - ball.radius ||
      ball.y + ball.vy < ball.radius
    ) {
      ball.vy = -ball.vy;
    }

    // check if the ball hit player's paddle
    if (
      ball.x <= 30 &&
      userPaddle.y <= ball.y &&
      userPaddle.y + userPaddle.height >= ball.y
    ) {
      calculateAngle(userPaddle);
    }

    // check if the ball hit computer's paddle
    if (
      ball.x >= canvas.width - 30 &&
      computerPaddle.y <= ball.y &&
      computerPaddle.y + computerPaddle.height >= ball.y
    ) {
      calculateAngle(computerPaddle);
    }

    // check if the paddle went out of bounds
    if (ball.x < 0) {
      resetBall();
      computerPaddle.score++;
      document.getElementById('computerScore').innerHTML = computerPaddle.score;
    }

    if (ball.x > canvas.width) {
      resetBall();
      userPaddle.score++;
      document.getElementById('playerScore').innerHTML = userPaddle.score;
    }


    window.requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top - userPaddle.height / 2;
    userPaddle.move(y);
  });

  window.requestAnimationFrame(draw);
}
