import { Box } from "@mui/material";
import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {

  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <Box
        sx={{
          width: 1080,
          height: 300,
          backgroundColor: '#e9ecef',
        }}>
          <br></br>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>UserName:</strong> {currentUser.username}
      </p>
     
      <p>
      <strong>Authorities:</strong>
      </p>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>
      </Box>
    </div>
  );
};

export default Profile;
