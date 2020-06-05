import axios from "axios";
import { useState } from "react";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const res = await axios[method](url, body);
      return res.data;
    } catch (err) {
      let errors = err.response && err.response.data.errors;
      setErrors(
        errors.map((error, index) => {
          return (
            <div className="alert alert-danger" role="alert" key={index}>
              {error.message}
            </div>
          );
        })
      );
    }
  };

  return { doRequest, errors };
};
