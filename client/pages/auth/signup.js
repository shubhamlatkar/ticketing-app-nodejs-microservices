import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [signupObj, setSignupobj] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);

  const onchangeHandler = event => {
    event.preventDefault();
    let { name, value } = event.target;
    setSignupobj({ ...signupObj, [name]: value });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();
    let { email, password } = signupObj;
    try {
      let res = await axios.post(
        "https://7st5d.sse.codesandbox.io/api/users/signup",
        {
          email: email,
          password: password
        }
      );
      console.log("res", res);
    } catch (err) {
      setErrors(err.response && err.response.data.errors);
    }
  };
  return (
    <form className="container">
      <h1>signup</h1>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="text"
          value={signupObj.email}
          onChange={onchangeHandler}
          className="form-control"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          value={signupObj.password}
          onChange={onchangeHandler}
          type="password"
          className="form-control"
        />
      </div>
      <div className="row">
        {errors !== []
          ? errors.map((error, index) => {
              return (
                <div className="alert alert-danger" role="alert" key={index}>
                  {error.message}
                </div>
              );
            })
          : null}
      </div>
      <div>
        <button onClick={onSubmitHandler} className="btn btn-primary">
          Sign up
        </button>
      </div>
    </form>
  );
};
