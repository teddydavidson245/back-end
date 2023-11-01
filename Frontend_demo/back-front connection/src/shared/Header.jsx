import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const login = Cookies.get("login");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="registerForm">
          <ul className="navbar-nav mr-auto">
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/players">
                  All Players
                </Link>
              </li>
            </>
            {login ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/addplayer">
                    Add Player
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
