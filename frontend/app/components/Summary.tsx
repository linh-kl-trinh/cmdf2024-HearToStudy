import React from "react";
import { Flex, Card, Button, Input, Avatar } from "antd";
import { useState, useEffect } from "react";
import { Typography } from "antd";
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

  const formattedLines = content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < content.length - 1 && <br />}{" "}
      {/* Add <br> except after the last line */}
    </React.Fragment>
  ));

  return (
    <Flex gap="large" vertical>
      <Title
        align="center"
        style={{ fontWeight: "bold", color: "#06D6A0", fontSize: "40px" }}
      >
        Summary
      </Title>
      <Card bordered={false}>{formattedLines}</Card>
      <Button
        href="/counter"
        type="primary"
        style={{ backgroundColor: "#06D6A0", color: "black" }}
      >
        QUIZ ME!
      </Button>
    </Flex>
  );
};

export default Summary;
