import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TokenHandler() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, [location.search]);

  return null; // This component doesn't render anything
}

export default TokenHandler;