import React, { useState, useEffect } from "react";
import { getUserBoard } from "../services/user.service";
import EventBus from "../common/EventBus";
// import { Formik, Field, Form } from "formik";
import { useFormik } from "formik";
import { getCurrentUser, getUser, update } from "../services/auth.service";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const BoardUser: React.FC = () => {

  const currentUser = getCurrentUser();
  // const getUser=
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState<any>({email:"",username:""});
   const formik = useFormik({
     initialValues: {
       u_id:"",
       username: "",
       email: "",
     },
     onSubmit: (values) => {
       handleUpdate(values);
     },
   });
  useEffect(() => {
    getUser().then((response) => {
      setUserData({
        email: response.data.getuser[0].email,
        username: response.data.getuser[0].username,
      });
       formik.setFieldValue("email", response.data.getuser[0].email);
        formik.setFieldValue("username", response.data.getuser[0].username);
    });
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

 

  const handleCancel = () => {
    window.location.reload();
  };

  const handleUpdate = (formValue: { username: string; email: string }) => {
    const { username, email } = formValue;

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

  console.log(";fks;kf;lsk;flks;lfk;slk", formik.values,userData);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Update Profile</h1>
      </header>
      <Box
        sx={{
          width: 1090,
          height: 300,
          backgroundColor: "primary.dark",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <p>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </p>
          <p>
            <label htmlFor="email">&nbsp;Email:</label>
            <input
              className="email"
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </p>
          <p>
            <Button type="submit" variant="contained">
              <span>Update</span>
            </Button>
            &nbsp;
            <Button type="reset" variant="contained" onClick={handleCancel}>
              <span>Cancel</span>
            </Button>
          </p>
        </form>
      </Box>
    </div>
  );
};

export default BoardUser;
