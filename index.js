const express = require('express');
const tmi = require('tmi.js');
const server = express();
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const Store = require('electron-store');
const bodyParser = require('body-parser');

const store = new Store();
let win;

function createPowerShellKeyboardEvent(key){
  return `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${key}')"`
}

server.use(express.static(path.join(__dirname, 'build')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

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
  const channel = store.get('channel')
  return res.send({ channel });
})

server.post('/channel', (req, res) => {
  const body = req.body;
  if(body.channel){
    store.set('channel', body.channel)
    return res.send({ success: true, message: 'Registered' });
  }
  return res.send({ success: false, message: 'need channel' });
})

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
