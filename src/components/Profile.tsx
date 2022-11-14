import { Formik, Field,Form } from "formik";
import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {

  const currentUser = getCurrentUser();
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

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
      >
          <Form>
            <p>
              <label htmlFor="username">Username:</label>
              <Field name="username" type="text"/>
            </p>
             <p>
              <label htmlFor="email">Email:</label>
              <Field className="email" name="email" type="text"/>
            </p>
          </Form>
      </Formik>
      <p>
      <strong>Authorities:</strong>
      </p>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul>
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

export default Profile;
