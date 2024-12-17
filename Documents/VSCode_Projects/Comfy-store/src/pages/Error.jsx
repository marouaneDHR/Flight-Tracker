import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid  place-items-center my-44  ">
        <div className="text-center">
          <p className="text-9xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-3xl tracking-tight capitalize font-bold">
            page not found
          </h1>
          <p className="text-lg mt-6 text-center leading-7 ">
            Sorry , we couldn't find the page you're looking for .
          </p>
        </div>
        <div className="mt-10">
          <Link to="/" className="btn btn-primary">
            GO BACK HOME
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="flex justify-center tracking-wider h-screen my-56">
      <h1 className="text-6xl">Something went wrong !!!</h1>
    </div>
  );
};

export default Error;
