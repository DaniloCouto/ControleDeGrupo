import { useState, useEffect } from 'react';
import tmi from 'tmi.js';
import { SocketMessage } from '../services/types'

export const useTwitchChat = (channel : string) => {
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  useEffect(() => {
    const newClient = new tmi.Client({
        connection: { reconnect: true },
        channels: [channel]
    });
    newClient.connect();

    newClient.on('message', (channel, tags, message, self) => {
      if (self) return;
      console.log('message', tags)
      setMessages((prevMessages) => {
        const localId = tags.id ? tags.id : "rando"
        const containedChat = prevMessages.length > 100 ? prevMessages.splice(0, 99) : prevMessages
        if(prevMessages.findIndex((mes) => mes.id === localId ) < 0)
          return [...containedChat, 
            {
              id:  localId,
              bits: 0,
              subscription: false,
              message,
              displayName: tags['display-name'] || 'Anonimo'
            }
          ];
        
        return prevMessages;
      });
    });

    newClient.on('cheer', (channel, tags, message) => {
      setMessages((prevMessages) => {
        const localId = tags.id ? tags.id : "rando"
        const localBits = tags.bits ? Number(tags.bits) : 0
        const containedChat = prevMessages.length > 100 ? prevMessages.splice(0, 99) : prevMessages
        if(prevMessages.findIndex((mes) => mes.id === localId ) < 0)
          return [...containedChat, 
            {
              id:  localId,
              bits: localBits,
              subscription: false,
              message,
              displayName: tags['display-name'] || 'Anonimo'
            }
          ];
        
        return prevMessages;
      });
    });

    return () => {
      newClient.disconnect();
    };
  }, []);

  return messages;
};

export default useTwitchChat;