import axios from "axios";
import { useState } from "react";

export default () => {
  const [errors, setErrors] = useState(null);

  const doRequest = ({ url, method, body, onSuccess }) => {
    axios[method](url, body)
      .then(res => {
        if (onSuccess) onSuccess();
        return res.data;
      })
      .catch(err => {
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
      });
  };

  return { doRequest, errors };
};
