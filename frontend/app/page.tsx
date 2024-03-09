"use client";
import Image from "next/image";
import { Tabs, Button } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const onClick = () => {
  console.log("clicked");
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Text",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Voice",
    children: "Content of Tab Pane 2",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        onChange={onChange}
      />
      <Button onClick={onClick}>QUIZ ME!</Button>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
