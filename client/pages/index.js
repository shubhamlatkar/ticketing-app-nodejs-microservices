import buildClient from "../api/build-client";
import Axios from "axios";

const IndexPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return (
    <div className="alert alert-primary" role="alert">
      shubham latkar
    </div>
  );
};

IndexPage.getInitialProps = async context => {
  // let userAxios = buildClient(context);
  // const { data } = await userAxios.get("/api/users/currentUser");
  // return data;
  let responseData = null;

  if (typeof window === "undefined") {
    const { data } = await Axios.get(
      "https://7st5d.sse.codesandbox.io/api/users/currentUser",
      {
        headers: context.req.headers
      }
    )
      .then(res => res)
      .catch(err => err);
    responseData = data;
  } else {
    let token = localStorage.getItem("token");
    token = "Bearer " + token;
    let headers = {
      "Content-Type": "application/json",
      Authorization: token
    };
    const { data } = await Axios.get(
      "https://7st5d.sse.codesandbox.io/api/users/currentUser",
      { headers: headers }
    )
      .then(res => res)
      .catch(err => err);
    return data;
  }
  return { ...responseData };
};
export default IndexPage;
