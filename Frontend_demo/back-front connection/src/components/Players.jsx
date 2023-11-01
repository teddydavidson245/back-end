import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Players() {
    const navigate = useNavigate();
  const login = Cookies.get("login");
  const [players, getPlayers] = useState([]);
  const getAllPlayers = async () => {
    try {
      const result = await axios.get("http://localhost:3000/player/players");
      getPlayers(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPlayers();
  }, []);

  const click = (id) =>{
    // console.log("this works")
    // console.log(id)
    navigate(`/player/${id}`)
  };
  return (
    <div>
      {players && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              {login && <th scope="col">Options</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.player_id}>
                <th>{player.player_id}</th>
                <td> {player.player_name}</td>
                <td> {player.first_name}</td>
                <td> {player.last_name}</td>
                {login && (
                  <td>
                    <button onClick={()=> click(player.player_id)} type="button" className="btn btn-primary">
                      Details
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Players;
