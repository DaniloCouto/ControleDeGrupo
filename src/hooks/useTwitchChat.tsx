import { useState, useEffect } from 'react';
import tmi from 'tmi.js';

const useTwitchChat = (channel : string) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newClient = new tmi.Client({
        channels: [channel]
    });
    newClient.connect();

    newClient.on('message', (channel, tags, message, self) => {
      if (self) return;
      setMessages((prevMessages) => [...prevMessages, `${tags['display-name']}: ${message}`]);
    });

    return () => {
      newClient.disconnect();
    };
  }, []);

  return messages;
};

export default useTwitchChat;