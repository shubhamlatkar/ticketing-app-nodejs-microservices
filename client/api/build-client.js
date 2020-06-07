import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "https://7st5d.sse.codesandbox.io",
      headers: req.headers
    });
  } else {
    return axios.create({
      baseURL: "https://7st5d.sse.codesandbox.io"
    });
  }
};
