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
  const [frontCards, setFrontCards] = useState<string[]>([]);
  const [backCards, setBackCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let cardCount = 10;

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getQuiz");
        if (response.ok) {
          // Handle success
          const data = await response.json();
          const jsonData = JSON.parse(data.flashcards);
          parseFrontCards(jsonData);
          parseBackCards(jsonData);
          setIsLoading(false);
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

  const parseFrontCards = (jsonData: Flashcard[]) => {
    try {
      const newFrontCards = jsonData.map((card) => card.front);
      setFrontCards((prevFrontCards) => [...prevFrontCards, ...newFrontCards]);
    } catch (error) {
      console.error("Error parsing string:", error);
    }
  };

  const parseBackCards = (jsonData: Flashcard[]) => {
    try {
      const newBackCards = jsonData.map((card) => card.back);
      setBackCards((prevBackCards) => [...prevBackCards, ...newBackCards]);
    } catch (error) {
      console.error("Error parsing string:", error);
    }
  };

  useEffect(() => {
    console.log(frontCards);
    console.log(backCards);
  }, [frontCards, backCards]);

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
    if (currCard == 0) {
      setCurrCard(cardCount - 1);
    } else {
      setCurrCard(currCard - 1);
    }
  };

  const handleNextCard = () => {
    if (currCard == cardCount) {
      setCurrCard(0);
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
                    className="flex flex-col shadow-md bg-white align-middle text-center z-20 text-lg"
                  >
                    {frontCards[currCard]}
                  </div>
                  <div
                    style={boxStyle}
                    className="flex flex-col shadow-md bg-white align-middle text-center z-20 text-lg"
                  >
                    {backCards[currCard]}
                  </div>
                </ReactCardFlip>
                <Flex gap="small" style={{ marginBottom: "10px" }}>
                  <Button
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    onClick={handlePrevCard}
                    className="circle-button"
                    style={{ color: "black" }}
                  />
                  <Button
                    shape="circle"
                    icon={<ArrowRightOutlined />}
                    onClick={handleNextCard}
                    className="circle-button"
                    style={{
                      color: "black",
                    }}
                  />
                </Flex>
                <Button
                  onClick={handleFlip}
                  className="flip"
                  style={{
                    color: "black",
                  }}
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
