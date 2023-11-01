import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const logout = () => {
Cookies.remove("login");
navigate("/login");
location.reload();
    };
    return (
        <div className="center">
            <button type="button" className = "btn btn-primary" onClick={logout}>  Logout </button>
        </div>
    )
}

export default Logout