"use client";
import React, { CSSProperties, useState, useEffect } from "react";
import Image from "next/image";
import { Flex, Layout, Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import ReactCardFlip from "react-card-flip";
import Loading from "../components/Loading";

const Flashcard = () => {
  const [flip, setFlip] = useState(false);
  const [currCard, setCurrCard] = useState(1);
  const [cards, setCards] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let cardCount = 10;

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getQuiz");
        if (response.ok) {
          // Handle success
          const data = await response.json();
          setIsLoading(false);
          const cards = data.flashcards;
          setCards(parseCards(cards));
        } else {
          // Handle error
          const errorData = await response.json();
          console.error("Error:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getCards(); // Call getCards() only once after the component mounts
  }, []);

  interface Flashcard {
    front: string;
    back: string;
  }
  
  const parseCards = (str: string): { [key: string]: string } => {
    try {
        const jsonArray: Flashcard[] = JSON.parse(str);
        const dict: { [key: string]: string } = {};

        jsonArray.forEach((card: Flashcard) => {
            dict[card.front] = card.back;
        });
       
        return dict;
    } catch (error) {
        console.error("Error parsing string:", error);
        return {}; // Return an empty object if parsing fails
    }
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
    padding: 15,
    backgroundColor: "#FEFCE6",
    marginTop: "calc(10%)",
  };

  const boxStyle: CSSProperties = {
    width: "400px",
    height: "300px",
    margin: "20px",
    borderRadius: "8px",
    padding: "20px",
  };

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handlePrevCard = () => {
    if (currCard == 1) {
      setCurrCard(cardCount);
    } else {
      setCurrCard(currCard - 1);
    }
  };

  const handleNextCard = () => {
    if (currCard == cardCount) {
      setCurrCard(1);
    } else {
      setCurrCard(currCard + 1);
    }
  };

  return (
    <>
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
          <Flex vertical align="center" justify="center">
          {isLoading ? (
              <Loading />
            ) : (
            <>
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                    <div
                      style={boxStyle}
                      className="flex flex-col shadow-md bg-white align-middle text-center z-20"
                    >
                      Welcome to GFG.
                    </div>
                    <div
                      style={boxStyle}
                      className="flex flex-col shadow-md bg-white align-middle text-center z-20"
                    >
                      Computer Science Portal.
                    </div>
                  </ReactCardFlip>
                  <Flex gap="small" style={{ marginBottom: "10px" }}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowLeftOutlined />}
                        onClick={handlePrevCard}
                        style={{ backgroundColor: "#06D6A0", color: "black" }} />
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                        onClick={handleNextCard}
                        style={{ backgroundColor: "#06D6A0", color: "black" }} />
                    </Flex>
                    <Button
                      type="primary"
                      onClick={handleFlip}
                      style={{ backgroundColor: "#F8B7C5", color: "black" }}
                    >
                      FLIP
                    </Button>
                    </>
          )}
          </Flex>
        </Layout>
      </Flex>
    </>
  );
};

export default Flashcard;
