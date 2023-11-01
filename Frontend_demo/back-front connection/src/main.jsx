import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Register from './components/Register.jsx';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Player from './components/Player.jsx';
import Players from './components/Players.jsx';
import AddPlayer from './components/AddPlayer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
    <Router>
    <App />
      <Routes>
        <Route path="login" element = {<Login/>}></Route>
        <Route path="logout" element = {<Logout/>}></Route>
        <Route path="register" element = {<Register/>}></Route>
        <Route path = "players" element = {<Players/>}></Route>
        <Route path = "player/:id" element = {<Player/>}></Route>
        <Route path = "Addplayer" element = {<AddPlayer/>}></Route>
      </Routes>
    </Router>
   <ToastContainer/>
  </React.StrictMode>,
)
