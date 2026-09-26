import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until the initial auth check has finished before deciding.
    if (loading) return;

    // If there's no logged-in user, send them to the login page.
    if (!user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
};