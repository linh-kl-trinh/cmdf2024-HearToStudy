import React from "react";
import { InputNumber, Flex, Layout, Typography, Button } from "antd";
import Image from "next/image";
import { SettingOutlined } from "@ant-design/icons";

const { Text } = Typography;

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
            NEXT
          </Button>
        </Flex>
      </Layout>
    </Flex>
  );
};

export default Counter;
