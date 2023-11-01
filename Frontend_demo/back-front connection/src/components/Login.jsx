import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const registerData = Object.fromEntries(data);
    try {
        const response = await axios.post("http://localhost:3000/api/login", registerData);
        // console.log(response.data)
        let d = new Date();
        d.setTime(d.getTime + 59*60*1000)
        Cookies.set('login', response["data"], {expires: d});
        // console.log(Cookies.get("login"));
        navigate("/");
        location.reload();
    } catch (e) {
        const error = e.response.data;
        console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={login} className="registerForm">
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="admin_name"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="admin_password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
