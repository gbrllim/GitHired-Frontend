//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

//-----------Components-----------//
//-----------Media-----------//
import logo from "../Images/favicon_io/logo192.png";

export default function ApplicationPage() {
  const { id } = useParams();
  const [formInfo, setFormInfo] = useState({
    userId: 1, //Set as 1 for now
    companyName: "",
    jobPosition: "",
    location: "",
    jobDescription: "",
    is_bookmarked: false,
    color: "#1C3F58", // Default primary color
    statusId: "",
    applicationDate: "",
  });

  // Retrieve Data from Backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/1/${id}`) // Endpoint: users/:userId/:applicationId
      .then((response) => {
        console.log("Single Application Endpoint", response.data.application);
        setFormInfo(response.data.application);
      });
  }, []);

  const toggleIsBookmarked = () => {
    setFormInfo((prevState) => ({
      ...prevState,
      is_bookmarked: !prevState.is_bookmarked,
    }));
  };

  return (
    <div className="absolute left-1/2 top-1/2 z-30 flex h-full max-h-[90%] w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg bg-slate-950 shadow-lg shadow-secondary">
      <NavLink
        to="/dashboard"
        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 "
      >
        ✕
      </NavLink>
      <div className="flex w-full flex-row p-3">
        <img
          src={logo}
          alt="company icon"
          className="m-3 h-[72px] rounded-full"
        />
        <main className="mt-3">
          <h1 className="text-[28px]">{formInfo && formInfo.companyName}</h1>
          <h2 className="">
            {formInfo && formInfo.jobPosition}{" "}
            {formInfo && formInfo.is_bookmarked}
          </h2>
        </main>
        <div
          className={`ml-5 mr-auto flex items-center justify-center  ${
            formInfo && formInfo.is_bookmarked ? "text-red-500" : "text-text"
          }  hover:text-primary`}
        >
          <button
            className=" text-[28px] leading-none"
            onClick={toggleIsBookmarked}
          >
            ♥︎
          </button>
        </div>
      </div>
    </div>
  );
}
