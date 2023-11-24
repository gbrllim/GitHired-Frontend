//-----------Libraries-----------//

//-----------Components-----------//
import ApplicationGroup from "./ApplicationGroup";

const Dashboard = ({ appGroup }) => {
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
