import React, { useRef, useState, useEffect } from "react";
import * as Services from "./Services";
import "./App.css";

const App = () => {
  const [colorCode, setColorCode] = useState([]);
  const height = 128;
  const width = 256;
  const canvasRef = useRef(null);

  useEffect(() => {
    getColoursCode();
  }, []);

  // API calling
  const getColoursCode = async () => {
    try {
      const response = await Services.getData();
      setColorCode(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  if (canvasRef.current) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    colorCode.forEach((value) => {
      ctx.fillStyle = value;
      ctx.fillRect(w, h, 1, 1);
      w++;

      if (w > width) {
        w = 0;
        h++;
      }
    });
  }

  return (
    <div className="container d-flex justify-content-center mt-5 App">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default App;
