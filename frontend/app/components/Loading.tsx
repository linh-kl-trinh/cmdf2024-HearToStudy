import React from "react";
import { Flex, Card } from "antd";
import Image from "next/image";
import fall from "/fall.gif";

const Loading = () => {
  return (
    <img
      src={"/fall.gif"}
      alt="Loading"
      style={{ width: "20px", height: "20px" }}
    />
  );
};

export default Loading;
