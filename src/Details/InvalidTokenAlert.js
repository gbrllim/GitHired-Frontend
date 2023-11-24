//-----------Libaries-----------//
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//-----------Utilities-----------//
import { bearerToken } from "../Utilities/token";

const InvalidTokenAlert = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);
  const [showFailedAlert, setShowFailedAlert] = useState(false);

  useEffect(() => {
    const tokenRetrieved = new URLSearchParams(window.location.search).get(
      "token",
    );
    if (tokenRetrieved) {
      const token = tokenRetrieved;
      verifyToken(token);
    } else {
      const token = localStorage.getItem("token");
      verifyToken(token);
    }
  }, []);

  const verifyToken = (token) => {
    axios.get(`${BACKEND_URL}/users`, bearerToken(token)).catch((error) => {
      localStorage.removeItem("token"); // Remove existing tokens if not valid + timeout
      setShowFailedAlert(true);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(countdownInterval);
        navigate("/");
      }, 5000);
    });
  };

  return (
    <>
      {showFailedAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="alert alert-error fixed bottom-10 left-5 z-30 w-[500px] bg-red-200 shadow-lg shadow-slate-900 "
        >
          <span className=" font-semibold text-background">
            ❌ Invalid/Missing Token - Redirecting in {countdown} seconds
          </span>
        </motion.div>
      )}
    </>
  );
};

export default InvalidTokenAlert;
