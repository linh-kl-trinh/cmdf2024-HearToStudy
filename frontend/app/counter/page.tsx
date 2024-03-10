"use client";
import React from "react";
import { InputNumber, Flex, Layout, Typography, Button } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";

const Counter = () => {
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
    padding: 15,
    backgroundColor: "#FEFCE6",
    marginTop: "calc(10%)",
    alignItems: "center",
  };

  const [styleTagsPresent, setStyleTagsPresent] = useState(false);

  useEffect(() => {
    const pollStyleTags = setInterval(() => {
      const styleTags = document.querySelectorAll("style");

      if (styleTags.length > 0) {
        setStyleTagsPresent(true);
        clearInterval(pollStyleTags); // Stop polling once style tags are found
      }
    }, 1000); // Poll every 1000 milliseconds (1 second)

    // Cleanup interval when component unmounts
    return () => clearInterval(pollStyleTags);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Flex gap="middle" wrap="wrap" justify="center">
      <Image
        src="/corner.png"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
        alt="background"
      />
      {styleTagsPresent ? (
        <Layout style={layoutStyle}>
          {/* <Text type="success">How many questions would you like to ask?</Text> */}
          <Flex gap="middle" vertical align="center">
            <h2>
              <b>How many flashcards would you like to make?</b>
            </h2>
            <InputNumber defaultValue={10} max={40} />
            <Button
              href="/flashcards"
              type="primary"
              style={{ backgroundColor: "#06D6A0", color: "black" }}
            >
              SUBMIT
            </Button>
          </Flex>
        </Layout>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Counter;
