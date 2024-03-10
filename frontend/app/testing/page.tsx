import React from "react";
import { Flex, Layout, Card } from "antd";
import Image from "next/image";
import Loading from "../components/Loading";

const Testing = () => {
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
    padding: 15,
    backgroundColor: "#FEFCE6",
    marginTop: "calc(10%)",
  };

  return (
    <Flex gap="middle" wrap="wrap" justify="center">
      <Image
        src="/lrgrainbow.png"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
        alt="background"
      />
      <Layout style={layoutStyle}>
        <Loading />
      </Layout>
    </Flex>
  );
};

export default Testing;
