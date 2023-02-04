const express = require('express');
const tmi = require('tmi.js');
const server = express();
const path = require('path');
const { app, BrowserWindow } = require('electron');

let win;

server.use(express.static(path.join(__dirname, 'build')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('http://localhost:3000');
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
