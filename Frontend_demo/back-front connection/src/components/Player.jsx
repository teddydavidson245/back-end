import React from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from 'react';
import Cookies from "js-cookie";

function Player() {
    const login = Cookies.get("login");
    const [player, getPlayer] = useState({})
    const location = useParams()
    console.log(location.id);
    useEffect(()=>{
        getUser()
    }, [])

    const getUser = async () => {
        try {
           const response = await axios.get(`http://localhost:3000/player/player/${location.id}`) ;
        //    console.log(response.data[0])
        getPlayer(response.data[0])
        } catch (error) {
           console.log(error) 
        }
    };
    const submitData = async (e)=>{
e.preventDefault()
const data = new FormData(e.target)
const updatedPlayer = Object.fromEntries(data)
try {
    await axios.put(`http://localhost:3000/player/player/${location.id}`,updatedPlayer,
    {headers: {
        authorization: login,
    },
});

} catch (error) {
   console.log(error) 
}
    };

    const change = (e) => {
        getPlayer(prev => ({
            ...prev,[e.target.name]: e.target.value,
        }));
        console.log(e.target.value)
    };
  return (
    <div>
        {
            login && player && (
                <div>
                <form onSubmit={submitData}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full Name</label>
                    <input
                      type="text"
                      className="htmlForm-control"
                      aria-describedby="emailHelp"
                      placeholder="Full name"
                      name="player_name"
                      value={player.player_name || ""}
                      onChange={change}
                      required
                    />

                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="first_name"
                      value={player.first_name || ""}
                      onChange={change}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="last_name"
                      value={player.last_name || ""}
                      onChange={change}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div> 
            ) 
        }
    </div>
  )
}

export default Player