//-----------Libaries-----------//
import { NavLink, useRouteError } from "react-router-dom";

//-----------Media-----------//
import logo from "../Images/Logo-GitHired.svg";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <NavLink to="/">
        <img
          src={logo}
          className="m-2 h-[90px] hover:translate-y-[-2px] hover:scale-[1.01]"
          alt="GitHired Logo"
        />
      </NavLink>
      <figure className="m-2 flex max-w-sm flex-col items-center justify-center rounded-lg border-2 border-text p-3 sm:max-w-lg">
        <p>Sorry, an unexpected error has occurred!</p>
        <p className="m-2  min-w-full rounded-xl bg-primary p-2 text-center">
          <i>Error: {error.statusText || error.message}</i>
        </p>
        <p className="text-[10px] leading-none text-slate-500">
          Click the logo above to return to the homepage
        </p>
      </figure>
    </div>
  );
}
