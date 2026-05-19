import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  // ----- EFFECTS -----
  // Use location to scroll to top of page on pathname change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ----- RENDER -----
  return (
    <main className="page-content">
      <Outlet />
    </main>
  );
}