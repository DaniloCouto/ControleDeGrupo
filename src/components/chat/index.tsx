import React from 'react';
import './index.css';
import useTwitchChat from '../../hooks/useTwitchChat';

interface ChatProps {
    channel: string
}

const Chat : React.FC<ChatProps> = ({ channel }) => {
  const chat = useTwitchChat(channel)
  return (
    <div className="App">
      <header className="App-header">
        {
          chat.map((val) => (
            <>
              <div>
                {val}
              </div>
              <br/>
            </>
          ))
        }
      </header>
    </div>
  );
}

export default Chat;
