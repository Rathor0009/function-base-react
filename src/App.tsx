import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import BoardUser from "./components/BoardUser";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

import { LogoutOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EventBus from "./common/EventBus";
import UploadFile from "./components/Upload";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BoyIcon from '@mui/icons-material/Boy'; 
import AppsIcon from '@mui/icons-material/Apps';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <AppsIcon fontSize="large"/>
          {/* App */}
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <HomeRoundedIcon />
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                <BoyIcon />
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/upload"} className="nav-link">
                <CloudUploadIcon />
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <IconButton color="primary" aria-label="logout" component="label" onClick={logOut}>
               
                <LogoutOutlined />
              </IconButton>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <LoginIcon />
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <PersonAddIcon />
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
