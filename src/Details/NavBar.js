//-----------Libaries-----------//
import { NavLink } from "react-router-dom";

//-----------Media-----------//
import logo from "../Images/Logo-GitHired.svg";
import { useNavigate } from "react-router-dom";

const NavBar = ({ name, profilePic }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="fixed top-0 flex w-screen flex-row items-center justify-between bg-primary px-3 py-1">
      <section className="z-20 flex flex-row gap-2">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/metrics">Metrics</NavLink>
        <NavLink to="/practice">Practice</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </section>

      <div className="fixed z-10 flex w-full justify-center">
        <button onClick={handleClick}>
          <img
            src={logo}
            className=" h-8 translate-x-[-12px] hover:translate-y-[-2px]"
            alt="GitHired Logo"
          />
        </button>
      </div>
      <NavLink to="/settings" className=" inline-block">
        <div className="flex flex-row items-center hover:translate-y-[-2px]">
          <div className="px-2 font-bold">{name ? name : "Please login"}</div>
          <img
            src={profilePic}
            alt="Profile"
            className="full h-11 w-11 rounded-full border-[1px] border-white "
          />
        </div>
      </NavLink>
    </div>
  );
};

export default NavBar;
