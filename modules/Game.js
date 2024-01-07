import Canvas from "./Canvas";
import Paddle from "./Paddle";

export default function Game() {
  const canvas = Canvas();
  const leftPaddle = Paddle(20, 10);

  const movePaddle = (y) => {
    canvas.clearCanvas();

    // move the paddle within the boundaries of the canvas
    if (y < 0) leftPaddle.y = 0;
    else if (y + 80 > 500) leftPaddle.y = 420;
    else leftPaddle.y = y;
    canvas.drawPaddle(leftPaddle);
  };

  const init = () => {
    canvas.drawPaddle(leftPaddle);
    canvas.addHandler(movePaddle);
  };

  init();
}
