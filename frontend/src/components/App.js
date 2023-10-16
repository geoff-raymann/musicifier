import React from 'react';
// import { react, render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';


function App() {
      return (
          <div className="center">
            <HomePage />
          </div>

      );
    }

const appDiv = document.getElementById('app');
const root = createRoot(appDiv);
root.render(<App />);

export default App;


