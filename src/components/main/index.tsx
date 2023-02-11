import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { TextField, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { creators as channelCreators } from "../../store/ducks/channel";
import { getChannel } from "../../services/channel";
import ChannelRegister from '../channelRegister';
import ChatScreen from './chatScreen';


const Main : React.FC = () => {
  const dispatch = useDispatch();
  const channel = useSelector((state: RootState) => state.channel.name)
  const [ loading, setLoading ] = useState<boolean>(true)

  const getElectronChannel = async () => {
    setLoading(true)
    try{
      const response = await getChannel()
      handleChangeChannel( response.channel )
    }catch(e){

    }
    setLoading(false)
  }

  useEffect(()=>{
    getElectronChannel()
  }, [])
  
  const handleChangeChannel = ( channel: string ) => {
    console.log("channel", channel )
    dispatch(channelCreators.changeName(channel))
  }

  const cleanChannel = ( ) => {
    dispatch(channelCreators.cleanName())
  }

  if(loading){
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height:"100%", width:"100%"}}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if(!channel){
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height:"100%", width:"100%"}}>
        <Grid item>
          <ChannelRegister onConfirm={handleChangeChannel} />
        </Grid>
      </Grid>
    );
  }

  return (
    <ChatScreen channel={channel} />
  );
  
}

export default Main;
