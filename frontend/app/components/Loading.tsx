"use client";
import React from "react";
import { Flex, Card, Typography } from "antd";
import "./Loading.css";
const { Title } = Typography;

const Loading: React.FC<{ isSummary?: boolean }> = ({ isSummary }) => {
  return (
    <Flex gap="large" vertical>
      <Title
        style={{
          fontWeight: "bold",
          color: "#06D6A0",
          fontSize: "40px",
          textAlign: "center",
        }}
      >
        {isSummary ? "Summary" : "Flashcards"}
      </Title>
      <Card
        bordered={false}
        bodyStyle={{ padding: "0" }}
        className="loading-card"
      >
        <div className="loading">
          <img
            src="/soot_loop.gif"
            alt="Loading"
            style={{ width: "100%", opacity: "0.85" }}
          />
        </div>
      </Card>
    </Flex>
  );
};

export default Loading;
