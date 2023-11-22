//-----------Libraries-----------//

//-----------Components-----------//
import ApplicationGroup from "./ApplicationGroup";

const Dashboard = ({ appGroup }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // http://localhost:8080/users/1/applications

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
