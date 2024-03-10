import { Flex, Tabs, TabsProps, Input } from "antd";
import { useEffect, useState } from "react";
import ButtonOverlay from "./ButtonOverlay";

interface CustomSpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface MainProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Main: React.FC<MainProps> = ({ setText }) => {
  const { TextArea } = Input;

  const [transcription, setTranscription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window as any).webkitSpeechRecognition(); // Use type assertion

  recognition.lang = "en-US";

  recognition.onresult = (event: CustomSpeechRecognitionEvent) => {
    const result = event.results[0][0].transcript;
    setTranscription((prevTranscription) => prevTranscription + " " + result);
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsListening((prevState) => !prevState);
  };

  useEffect(() => {
    if (isListening) {
      recognition.start();
    }
  }, [isListening]);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Text",
      children: (
        <TextArea
          rows={12}
          placeholder="Paste text here..."
          onChange={onTextChange}
        />
      ),
    },
    {
      key: "2",
      label: "Voice",
      children: (
        <Flex vertical>
          <TextArea
            rows={12}
            placeholder="Click microphone to start live transcription..."
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
          <ButtonOverlay onClick={toggleListening} />
        </Flex>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} type="card" centered />;
};

export default Main;
