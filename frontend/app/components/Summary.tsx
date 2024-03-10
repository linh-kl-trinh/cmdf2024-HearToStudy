import React from "react";
import { Flex, Layout, Card, Button, Input, Avatar, Typography } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";

const { Title } = Typography;

const Summary = () => {
  const [content, setContent] = useState("");

  const fetchContent = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getSummary");
      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error("Error fetching summary content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getQuiz = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getQuiz");
      if (response.ok) {
        // Handle success
        const data = await response.json();
        const flashcards = data.flashcards;
        console.log("Success:", flashcards);
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formattedLines = content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < content.length - 1 && <br />}{" "}
      {/* Add <br> except after the last line */}
    </React.Fragment>
  ));

  return (
    <Flex gap="large" vertical>
      <Card bordered={false}>{formattedLines}</Card>
      <Button onClick={getQuiz} style={{ backgroundColor: "#06D6A0" }}>
        QUIZ ME!
      </Button>
    </Flex>
  );
};

export default Summary;
