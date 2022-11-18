import React, { useState, useEffect } from "react";
import { getUserBoard } from "../services/user.service";
import EventBus from "../common/EventBus";
import { Formik, Field, Form } from "formik";
import { getCurrentUser, getUser, update } from "../services/auth.service";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const BoardUser: React.FC = () => {
  const currentUser = getCurrentUser();
  const [content, setContent] = useState("");
  
  const initialValues: {
    u_id: string
    username: string;
    email: string;
  } = {
    u_id: currentUser._id,
    username: currentUser.username,
    email: currentUser.email,
  };

  const handleCancel = () => {
    window.location.reload();
  }

  const handleUpdate = (formValue: {username: string; email: string },) => {
    const { username, email } = formValue;
    console.log(username);
    

    update(currentUser.id, username, email).then(
      (res) => {
       console.log(res);
       
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // setLoading(false);
        // setMessage(resMessage);
      }
    );
  };

  useEffect(() => {
    getUser().then((response) => {
      console.log(response)
    })
    getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Update Profile</h1>
      </header>
      <Box sx={{
        width: 1090,
        height: 300,
        backgroundColor: 'primary.dark',
      }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleUpdate}
        >
          <Form>
            <p>
              <label htmlFor="username">Username:</label>
              <Field name="username" type="text" />
            </p>
            <p>
              <label htmlFor="email">&nbsp;Email:</label>
              <Field className="email" name="email" type="text" />
            </p>
            <p>
              <Button type="submit" variant="contained">
                <span>Update</span>
              </Button>&nbsp;
              <Button type="reset" variant="contained" onClick={handleCancel}>
                <span>Cancel</span>
              </Button>
            </p>
          </Form>
        </Formik>
        </Box>
      
      
    </div>
  );
};

export default BoardUser;
