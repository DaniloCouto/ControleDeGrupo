import React from 'react';
import logo from './logo.svg';
import './App.css';
import useTwitchChat from './hooks/useTwitchChat';

function App() {
  const chat = useTwitchChat('Krolm009')
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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

export default App;
