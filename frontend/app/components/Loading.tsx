"use client";
import React from "react";
import { Flex, Card } from "antd";
import { useRef, useEffect } from "react";
import "./Loading.css";
import { Typography } from "antd";
const { Title } = Typography;

const Loading = () => {
  return (
    <Flex gap="large" vertical>
      <Title
        align="center"
        style={{ fontWeight: "bold", color: "#06D6A0", fontSize: "40px" }}
      >
        Summary
      </Title>
      <Card bordered={false} bodyStyle={{ padding: "0" }}>
        <div style={{ backgroundColor: "#FEFCE6 !important" }}>
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
