import { useEffect, useState } from "react";
import { auth } from "../components/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await auth.signOut();

      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
        navigate("/", { replace: true });
        console.log("AFTERLOGOUT", user.uid);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
