import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const hasBusinessName = !!localStorage.getItem("businessName");

  React.useEffect(() => {
    if (userType === "business" || (hasBusinessName && !userType)) {
      navigate("/dashboard/business", { replace: true });
    } else {
      navigate("/dashboard/hustler", { replace: true });
    }
  }, [userType, hasBusinessName, navigate]);

  return null;
}
