import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface ChannelRegisterProps {
  onConfirm: ( arg0: string ) => void
}

const ChannelRegister : React.FC<ChannelRegisterProps> = ({ onConfirm }) => {
  const [name, setName ] = useState<string>('')

  const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const confirm = () => {
    onConfirm(name)
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{height:"100%", width:"100%"}}>
      <Grid item>
        <TextField
          label='Nome do Canal'
          value={name}
          onChange={handleChangeName}
        />
        <IconButton aria-label="check" onClick={confirm}>
          <CheckIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ChannelRegister;
