import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Legacy route — opens Home notification sidebar. */
export function NudgesPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/?notify=1", { replace: true });
  }, [navigate]);
  return null;
}
