# react 에서 canvas 사용하기

```js
import { useRef, useEffect, useState } from "react";

function App() {
  const [frame, setframe] = useState(0);
  const canvasRef = useRef < HTMLCanvasElement > null;
  const contextRef = useRef < HTMLVideoElement > null;

  const handleAnimationFrame = () => {
    const canvas = canvasRef.current;
    const video = contextRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (frame < 350) setframe(frame + 1);
      console.log(frame);
      context && context.drawImage(video, 0, 0, 300, 150);
    }
  };

  useEffect(() => {
    requestAnimationFrame(handleAnimationFrame);
  }, [frame]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video
        ref={contextRef}
        className="video"
        width="100px"
        height="100px"
        muted
        autoPlay
        src="./mainvideo.mp4"
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
```
