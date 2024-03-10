"use client";
import { Tabs, Button, Input } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";

const Home = () => {
  // const [voice, setVoice] = useState(false);
  const [text, setText] = useState("");

  const { TextArea } = Input;

  const onChange = (key: string) => {
    console.log(key);
  };

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const sendText = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/sendText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();
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

  const micOnClick = () => {
    // setVoice(true);

    // textbox.focus();

    var dictationEvent = new KeyboardEvent("keydown", {
      key: "F5",
      keyCode: 116,
      code: "F5",
    });

    document.dispatchEvent(dictationEvent);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Text",
      children: (
        <TextArea
          rows={4}
          placeholder="Paste text here..."
          onChange={onTextChange}
        />
      ),
    },
    {
      key: "2",
      label: "Voice",
      children: (
        <TextArea
          rows={4}
          placeholder="Click microphone to start live transcription..."
        />
      ), // add mic button overlay
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        onChange={onChange}
        centered
      />
      <Button onClick={sendText}>QUIZ ME!</Button>{" "}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
};

export default Home;
