//-----------Libraries-----------//
import axios from "axios";
import { useEffect, useState } from "react";

//-----------Components-----------//
import ApplicationGroup from "./ApplicationGroup";

const Dashboard = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // http://localhost:8080/users/1/applications

  const [appGroup, setAppGroup] = useState(null);

  // Retrieve data from the backend to populate dashboard
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/1/applications`) // Endpoint: /users/:userId/applications
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

        setAppGroup(groupedApps);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="mt-[50px] flex flex-row">
      <ApplicationGroup header="Wishlist" apps={appGroup?.Wishlist || []} />
      <ApplicationGroup header="Applied" apps={appGroup?.Applied || []} />
      <ApplicationGroup header="Screening" apps={appGroup?.Screening || []} />
      <ApplicationGroup header="Interview" apps={appGroup?.Interview || []} />
      <ApplicationGroup header="Offer" apps={appGroup?.Offer || []} />
    </main>
  );
};

export default Dashboard;
