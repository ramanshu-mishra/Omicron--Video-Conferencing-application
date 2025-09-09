"use client";
import { useRef, useEffect } from "react";


export default function NoiseCanvas({className}:{className:string}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    // Get pixel dimensions for rendering
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = imageData.data;

      for (let i = 0; i < buffer.length; i += 4) {
        const val = Math.random() * 255; // grayscale noise
        buffer[i] = val;     // R
        buffer[i + 1] = val; // G
        buffer[i + 2] = val; // B
        buffer[i + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      generateNoise();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className= {className}
    //   style={{
    //     width: typeof width === "number" ? `${width}px` : width,
    //     height: typeof height === "number" ? `${height}px` : height,
    //     display: "block",
    //   }}
    />
  );
}
