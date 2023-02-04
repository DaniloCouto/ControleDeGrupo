import React, { useEffect } from 'react';
import './index.css';
import useTwitchChat from '../../hooks/useTwitchChat';
import { sendCommand } from '../../services/command'

interface ChatProps {
    channel: string
}

const Chat : React.FC<ChatProps> = ({ channel }) => {
  const chat = useTwitchChat(channel)
  const lastMessage = chat[chat.length - 1]

  useEffect(() => {
    if(chat.length){
      if( chat[chat.length - 1].indexOf('pica') > -1){
        sendCommand('a')
      }
    }
  }, [chat])

  return (
    <div className="App">
      <header className="App-header">
        {
          lastMessage
        }
      </header>
    </div>
  );
}

export default Chat;
