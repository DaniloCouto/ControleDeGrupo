import React, { useEffect } from 'react';
import { Box } from "@mui/material";
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
      if( chat[chat.length - 1].message.indexOf('pica') > -1){
        sendCommand('a')
      }
    }
  }, [chat])

  return (
    <Box>
      {
        chat.map(({id, message, displayName}) => (
          <Box key={`message-${id}`} >
            {`${displayName} : ${message}`}
          </Box>
        ))
      }
    </Box>
  );
}

export default Chat;
