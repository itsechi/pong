export default function Canvas() {
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");

  const drawPaddle = (paddle) => {
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, 10, 80);
    requestAnimationFrame(drawPaddle);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const addHandler = (helper) => {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const y = (e.clientY - rect.top) - 40;
      helper(y);
    });
  };

  return { drawPaddle, clearCanvas, addHandler };
}
