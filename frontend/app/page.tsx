"use client";
import { Flex, Layout, Button } from "antd";
import Image from "next/image";
import Main from "./components/Main";
import { useState } from "react";
import Summary from "./components/Summary";
import Loading from "./components/Loading";

const Home = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSummary, setIsSummary] = useState(false);

  const sendText = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/sendText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();

        setIsLoading(false);
        console.log("Success:", data);
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
    padding: 15,
    backgroundColor: "#FEFCE6",
    marginTop: "calc(8%)",
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
        <Flex gap="large" vertical>
          {isSummary ? (
            isLoading ? (
              <Loading />
            ) : (
              <Summary />
            )
          ) : (
            <>
              <Main setText={setText} />
              <Button
                onClick={() => {
                  sendText();
                  setIsSummary(true);
                }}
                type="primary"
                style={{ backgroundColor: "#06D6A0", color: "black" }}
              >
                NEXT
              </Button>
            </>
          )}
        </Flex>
      </Layout>
    </Flex>
  );
};

export default Home;
