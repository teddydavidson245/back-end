const pool = require("../../../db");
const bcrypt = require("bcrypt");
const dotent = require("dotenv");
dotent.configDotenv.config()
const jwt = require("jsonwebtoken");

const getAdmin = (req, res) => {
    // res.send("we are in the controller");
    pool.query("Select * from admin", (error, results) => {
        if(error){
            throw error
        }else{
            res.status(200).json(results.rows)
        }
    })
};

const getSingleAdmin = (req, res) => {
//     const str = `Select admin_name from admin where admin_id = ${req.params.id}`
//    return res.send(req.params.id);
    pool.query("Select * from admin where admin_id = $1",
    [req.params.id],
    (error, results) => {
        if(error){
            throw error
        }else{
            res.status(200).json(results.rows)
        }
    })
};

const newAdmin = async (req, res) => {
    const {admin_name, admin_password, first_name, last_name} = req.body
    if(!admin_name || !admin_password || !first_name ||!last_name){
        return res.status(400).send("A field is missing")
    }
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(admin_password, salt);

    if(!re.exec(admin_name)){
        return res.status(400).send("Email is invalid")
    }
    const insert = `insert into admin(admin_name, admin_password, first_name, last_name) values('${admin_name}','${hashPassword}', '${first_name}', '${last_name}')` 
    pool.query(
        // "Select * from admin where admin_id = $1",
    // [req.params.id],
    insert,
    (error, results) => {
        if(error){
            throw error
        }else{
            res.status(200).send("Inserted into table.")
        }
    })
    return res.send(req.body)
};

const login = (req, res) => {
    const {admin_name, admin_password} = req.body;
    if(!admin_name || !admin_password) {
        return res.status(400).send("Missing username or password")
    }
    const select = `select * from admin where admin_name = '${admin_name}'`;
    let password = "";
    pool.query(select, async (error, results) => {
        if(error){
            return res.status(400).json(error["detail"]);
        } else {
            password = results.rows[0].admin_password
        }
        const match = await bcrypt.compare(admin_password,password)
        if (match){
            const accessToken = jwt.sign({
                admin_name,
            },
            process.env.WEB_TOKEN, {expiresIn: "15m"})
            return res.status(200).send(accessToken);
        } else{
            return res.status(400).send("Your password or email is incorrect");
        }
        
    });
    // return res.status(200).send("Login works")
    
}

module.exports = {
    getAdmin, getSingleAdmin, newAdmin, login
};