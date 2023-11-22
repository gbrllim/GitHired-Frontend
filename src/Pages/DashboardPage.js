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

//-----------Utlities-----------//
import { bearerToken } from "../Utilities/token";

export default function DashboardPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Store user data
  const [formInfo, setFormInfo] = useState({
    id: "",
    email: "",
    firstName: "",
    profilePic: null,
  });

  // Store application data
  const [data, setData] = useState(null);

  // State trackers
  const [countdown, setCountdown] = useState(30);
  const [showFailedAlert, setShowFailedAlert] = useState(false);

  // Token management
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
      // Retrieve user info
      axios
        .get(`${BACKEND_URL}/users/data`, bearerToken(token))
        .then((response) => {
          console.log("Token is valid", response.data.userData);
          const { id, email, firstName, profilePic } = response.data.userData;
          setFormInfo({
            ...formInfo,
            id: id,
            email: email,
            firstName: firstName,
            profilePic: profilePic,
          });
          refreshApps(); // Pull user applications info
        })
        .catch((error) => {
          console.log("Token not valid", error);
          localStorage.removeItem("token"); // Remove existing tokens if not valid + timeout
          setShowFailedAlert(true);
          const countdownInterval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
          }, 1000);
          setTimeout(() => {
            clearInterval(countdownInterval);
            navigate("/");
          }, 30000);
        });
    } else {
      console.log("No Token Found");
    }
  }, []);

  const refreshApps = () => {
    axios
      .get(`${BACKEND_URL}/users/applications`, bearerToken(token)) // Endpoint: /users/:userId/applications
      .then((response) => {
        console.log("Backend Data Pulled: ", response.data.applications);
        const data = response.data.applications;
        const statusArray = [
          "Wishlist",
          "Applied",
          "Screening",
          "Interview",
          "Offer",
          "Archive",
        ];

        // Grouping applications in "data" by status
        const groupedApps = {};

        statusArray.forEach((status) => {
          groupedApps[status] = data.filter(
            (app) => app.applicationStatus.status === status,
          );
        });
        setData(groupedApps);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

      <Dashboard appGroup={data} />
      <Outlet context={refreshApps} />
      <NewApplication userId={formInfo.id} refresh={refreshApps} />
    </motion.div>
  );
}
