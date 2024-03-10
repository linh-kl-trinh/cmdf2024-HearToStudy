"use client";
import React, { useState } from "react";
import { Flex, Layout } from "antd";
import ReactCardFlip from "react-card-flip";

const Summary = () => {
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
    padding: 15,
    backgroundColor: "#FEFCE6",
    marginTop: "calc(10%)",
  };

  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <Flex gap="middle" wrap="wrap" justify="center">
      <Layout style={layoutStyle}>
        <Flex align="center" justify="center">
          <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <div
              style={{
                width: "300px",
                height: "200px",
                background: "#d7fbda",
                fontSize: "40px",
                color: "green",
                margin: "20px",
                borderRadius: "4px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              Welcome to GFG.
              <br />
              <br />
              <button
                style={{
                  width: "150px",
                  padding: "10px",
                  fontSize: "20px",
                  background: "#f5d9fa",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
                onClick={() => setFlip(!flip)}
              >
                Flip
              </button>
            </div>
            <div
              style={{
                width: "300px",
                height: "200px",
                background: "#fbd7f8",
                fontSize: "40px",
                color: "blue",
                margin: "20px",
                borderRadius: "4px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              Computer Science Portal.
              <br />
              <button
                style={{
                  width: "150px",
                  padding: "10px",
                  fontSize: "20px",
                  background: "#f5d9fa",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
                onClick={() => setFlip(!flip)}
              >
                Flip
              </button>
            </div>
          </ReactCardFlip>
        </Flex>
      </Layout>
    </Flex>
  );
};

export default Summary;
