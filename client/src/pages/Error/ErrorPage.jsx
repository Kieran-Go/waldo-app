import { useRouteError, Link } from "react-router-dom";
import { useEffect } from "react";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  const message = error?.statusText || error?.message || "Unknown error";

  // Change document title on page load
    useEffect(() => {
      // Change document title
      document.title = "Oops - Something went wrong";
    }, []);

    // Log error
    useEffect(() => {
      console.error(error);
    },[error]);

  return (
    <>
      {/* Render error page elements */}
        <div className="error-container">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred:</p>
          <p className="error-message">{message}</p>
          <Link to="/">Back to Home</Link>
        </div>
    </>
  );
}
