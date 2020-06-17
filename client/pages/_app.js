import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Header from "./header";

const AppComponent = ({ Component, currentUser, pageProps }) => {
  console.log("currentUser app", currentUser);
  return (
    <div>
      <Header currentUser={currentUser && currentUser.email} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInItialProps = async appContext => {
  let pageProps = {};
  if (appContext.Component.getInItialProps)
    pageProps = await appContext.Component.getInItialProps(appContext.ctx);
  let responseData = null;

  if (typeof window === "undefined") {
    const { data } = await Axios.get(
      "https://7st5d.sse.codesandbox.io/api/users/currentUser",
      {
        headers: appContext.req.headers
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
    return { pageProps, ...data };
  }

  return { pageProps, ...responseData };
};

export default AppComponent;
