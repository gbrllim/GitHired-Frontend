//-----------Libaries-----------//
import { NavLink, Outlet } from "react-router-dom";
//-----------Components-----------//
import NavBar from "../Components/Details/NavBar";

//-----------Media-----------//

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <NavBar />
      <p>Dashboard</p>
      <Outlet />
      <NavLink to="/dashboard/add">Add</NavLink>
    </div>
  );
}
