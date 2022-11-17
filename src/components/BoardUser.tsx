import React, { useState, useEffect } from "react";

import { getUserBoard } from "../services/user.service";
import EventBus from "../common/EventBus";
import { Formik, Field, Form } from "formik";
import { getCurrentUser } from "../services/auth.service";

const BoardUser: React.FC = () => {
  const currentUser = getCurrentUser();
  const [content, setContent] = useState("");

  const initialValues: {
    username: string;
    email: string;
  } = {
    username: currentUser.username,
    email: currentUser.email,
  };

  const handleCancel = () => {
    window.location.reload();
  }

  const handleLogin = (formValue: { username: string; email: string },) => {
    // const { username, email } = formValue;


    // login(username, password).then(
    //   () => {
    //     navigate("/profile");
    //     window.location.reload();
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
    // );
  };

  useEffect(() => {
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
        >
          <Form>
            <p>
              <label htmlFor="username">Username:</label>
              <Field name="username" type="text" />
            </p>
            <p>
              <label htmlFor="email">Email:</label>
              <Field className="email" name="email" type="text" />
            </p>
          </Form>
        </Formik>
        
      </header>
      <p>
        <button type="submit" className="btn btn-primary">
          <span>Update</span>
        </button>&nbsp;
        <button type="reset" onClick={handleCancel} className="btn btn-primary">
          <span>Cancel</span>
        </button>
      </p>
    </div>
  );
};

export default BoardUser;
