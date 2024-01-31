import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error } = useRouteError();

  return (
    <div>
      <h1>Oops! {error?.message || "Something went wrong."}</h1>
      <p>
        <Link to={"/"}>Home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
