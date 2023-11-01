const { Connection } = require("pg");
const pool = require("../../../db");
const jwt = require("jsonwebtoken");

const getPlayers = (req, res) => {
  // res.send("we are in the controller");
  pool.query("Select * from player", (error, results) => {
    if (error) {
      throw error;
    } else {
      return res.status(200).json(results.rows);
    }
  });
};

const getSinglePlayer = (req, res) => {
  //     const str = `Select admin_name from admin where admin_id = ${req.params.id}`
  //    return res.send(req.params.id);
  pool.query(
    "Select * from player where player_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const createPlayers = (req, res) => {
  const { player_name, first_name, last_name } = req.body;
  if (!player_name || !first_name || !last_name) {
    return res.status(200).json("You are missing a field");
  }
  const bearer = req.headers.authorization.indexOf("Bearer");
  if (bearer > -1 && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.WEB_TOKEN);
      // return res.status(200).json(decoded);
      const insert = `insert into player(player_name, first_name, last_name) values('${player_name}', '${first_name}', '${last_name}')`;
      pool.query(insert, async (error, results) => {
        if (error) {
          return res.status(400).json(error["detail"]);
        } else {
          return res.status(200).send("Inserted into table");
        }
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  } else {
    return res.status(400).json("Error");
  }
};

const editSinglePlayer = (req, res) => {
    const bearer = req.headers.authorization;
    if(bearer) {
        const {player_name, first_name, last_name} = req.body;
        if(!player_name || !first_name || !last_name) {
            return res.status(400).send ("You are missing data");
        }
        pool.query(
            `Update player set player_name = '${player_name}', first_name = '${first_name}', last_name = '${last_name}'`);
            (error, results) => {
                if (error) {
                    throw error;
                }else {
                    console.log(result.rows);
                    res.status(200).send (`${player_name} has been updated`)
                }
            }
    }
}

module.exports = {
  getPlayers,
  getSinglePlayer,
  createPlayers,
};
