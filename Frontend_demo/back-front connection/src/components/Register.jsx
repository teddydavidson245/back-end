import React from "react";
import axios from 'axios';
import { toast } from "react-toastify";

function Register() {

const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    const registerData = Object.fromEntries(data)
    try {
        const returnData = await axios.post("http://localhost:3000/api/admin", registerData)
        toast.success("You have added an admin. Please log in.");
    } catch (e) {
        const error = e.response.data;
        if(error.includes("already")){
            toast.error("This email is already being used");
        }else{
            toast.error(error)
        }
       
       
    }
    console.log();
    
};

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="htmlForm-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="admin_name"
            required
          />
          <small className="htmlForm-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="admin_password"
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
