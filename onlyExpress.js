const express = require('express');
const tmi = require('tmi.js');
const server = express();
const path = require('path');
const { exec } = require('child_process');


function createPowerShellKeyboardEvent(key){
  return `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${key}')"`
}

server.use(express.static(path.join(__dirname, 'build')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

server.get('/run-command', (req, res) => {
  const key = req.query['key'] 
  if(key){
    exec(createPowerShellKeyboardEvent(req.query['key']), (error, stdout, stderr) => {
      if (error) {
        return res.send({ success: false });
      }
      return res.send({ success: true });
    });
  }else{
    return res.send({ success: false, message: 'need key' });
  }
});
server.get('/channel', (req, res) => {
  return res.send({ channel: 'barbatv' });
})

server.post('/channel', (req, res) => {
  return res.send({ success: true, message: 'Registered' });
})
