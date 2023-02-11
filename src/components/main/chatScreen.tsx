import React from 'react';
import { TextField, Grid } from '@mui/material';
import Chat from '../chat';

interface ChatScreenProps {
    channel: string
}

const ChatScreen : React.FC<ChatScreenProps> = ({ channel }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" style={{height:"100%", width:"100%"}}>
      <Grid item xs={4} style={{ overflowY: 'auto', maxHeight: "100vh"}}>
        <Chat channel={channel} />
      </Grid>
      <Grid item xs={8}>
        teste
      </Grid>
    </Grid>
  );
}

export default ChatScreen;
