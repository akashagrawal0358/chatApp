import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' ;
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/setAvatar" element={<SetAvatar />} /> */}
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App