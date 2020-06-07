import buildClient from "../api/build-client";

const IndexPage = ({ currentUser }) => {
  return (
    <div className="alert alert-primary" role="alert">
      shubham latkar
    </div>
  );
};

IndexPage.getInitialProps = async context => {
  const { data } = await buildClient(context).get("api/users/currentUser");
  return data;
};

export default IndexPage;
