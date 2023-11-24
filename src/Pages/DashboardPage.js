//-----------Libaries-----------//
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

//-----------Components-----------//
import NavBar from "../Details/NavBar";
import Dashboard from "../Components/DashboardPage/Dashboard";
import NewApplication from "../Components/DashboardPage/NewApplication";

//-----------Utilities-----------//
import { bearerToken } from "../Utilities/token";

export default function DashboardPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  // const [token, setToken] = useState("");

  // Store application data
  const [data, setData] = useState(null);

  // Token management - Set token and refresh applications
  useEffect(() => {
    const tokenRetrieved = new URLSearchParams(window.location.search).get(
      "token",
    );
    if (tokenRetrieved) {
      const token = tokenRetrieved;
      localStorage.setItem("token", tokenRetrieved);
      refreshApps(token);
    } else {
      const token = localStorage.getItem("token");
      refreshApps(token);
    }
  }, []);

  // Retrieve all applications for the user
  const refreshApps = (token) => {
    axios
      .get(`${BACKEND_URL}/users/applications`, bearerToken(token)) // Endpoint: /users/:userId/applications
      .then((response) => {
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
      <NavBar />
      <Dashboard appGroup={data} />
      <Outlet context={refreshApps} />
      <NewApplication refresh={refreshApps} />
    </motion.div>
  );
}
