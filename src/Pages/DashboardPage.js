//-----------Libaries-----------//
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

//-----------Components-----------//
import NavBar from "../Details/NavBar";
import Dashboard from "../Components/DashboardPage/Dashboard";
import NewApplication from "../Components/DashboardPage/NewApplication";
import InvalidTokenAlert from "../Details/InvalidTokenAlert";

//-----------Media-----------//

export default function DashboardPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    id: "",
    email: "",
    firstName: "",
    profilePic: null,
  });

  const [countdown, setCountdown] = useState(5);
  const [showFailedAlert, setShowFailedAlert] = useState(false);

  useEffect(() => {
    // Attempt to Retrieve token from search params
    let storedToken;
    const tokenRetrieved = new URLSearchParams(window.location.search).get(
      "token",
    );

    // If token retrieved, store in local storage
    if (tokenRetrieved) {
      localStorage.setItem("token", tokenRetrieved);
      console.log("Param Token Retrieved", tokenRetrieved);
    } else {
      // If not attempt to retrieve from local storage
      storedToken = localStorage.getItem("token");
      console.log("Stored Token Retrieved", storedToken);
    }

    const token = tokenRetrieved ?? storedToken;
    console.log("Token", token);

    if (token) {
      // Verify token and retrieve info
      axios
        .get(`${BACKEND_URL}/auth/verify?token=${token}`)
        .then((response) => {
          const { id, email, firstName, profilePic } = response.data;
          setFormInfo({
            ...formInfo,
            id: id,
            email: email,
            firstName: firstName,
            profilePic: profilePic,
          });
        })
        .catch((error) => {
          console.log("Token not valid");
          localStorage.removeItem("token"); // Remove existing tokens if not valid
          setShowFailedAlert(true);
          const countdownInterval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
          }, 1000);
          setTimeout(() => {
            clearInterval(countdownInterval);
            navigate("/");
          }, 5000);
        });
    } else {
      console.log("No Token Found");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="flex h-screen flex-col overflow-x-auto bg-background"
    >
      <div className="flex w-screen justify-center">
        {showFailedAlert && <InvalidTokenAlert countdown={countdown} />}
      </div>

      <NavBar name={formInfo.firstName} profilePic={formInfo.profilePic} />

      <Dashboard />
      <Outlet />

      <p className=" p-2 text-white">
        user_id: {formInfo.id} (Remove post-development) <br></br>email:
        {formInfo.email}
      </p>
      <NewApplication />
    </motion.div>
  );
}
