import React, { useState, useEffect } from "react";
import * as Services from "./Services";
import "./App.css";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [defaultLimit, setDefaultLimit] = useState(8000);
  const [total, setTotal] = useState(8000);

  const getColoursCode = async () => {
    setLoading(true);
    try {
      const response = await Services.getData(defaultLimit);
      console.log(response);
      setData(response.data.response);
      setTotal(response.data.total);
      setDefaultLimit(defaultLimit + 8000);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultLimit <= total + 8000 || defaultLimit === 8000) {
      getColoursCode();
    }
  }, [defaultLimit]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div>
        {loading && (
          <div
            className="spinner-border"
            style={{ margin: "auto", display: "block" }}
          ></div>
        )}
        <div className="row" style={{ width: "256px", height: "128px" }}>
          {data &&
            data.map((value, index) => {
              return (
                <div
                  key={index}
                  style={{
                    background: `${value}`,
                    width: "1px",
                    height: "1px",
                  }}
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
