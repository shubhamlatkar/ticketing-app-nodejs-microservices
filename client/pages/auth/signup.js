import React, { useState } from "react";
import userRequest from "../../hooks/user-request";
export default () => {
  const [signupObj, setSignupobj] = useState({
    email: "",
    password: ""
  });

  const { doRequest, errors } = userRequest({
    url: "https://7st5d.sse.codesandbox.io/api/users/signup",
    method: "post",
    body: {
      email: signupObj.email,
      password: signupObj.password
    }
  });

  const onchangeHandler = event => {
    event.preventDefault();
    let { name, value } = event.target;
    setSignupobj({ ...signupObj, [name]: value });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();
    doRequest();
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
      <div className="row">{errors ? errors : null}</div>
      <div>
        <button onClick={onSubmitHandler} className="btn btn-primary">
          Sign up
        </button>
      </div>
    </form>
  );
};
