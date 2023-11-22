//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { motion } from "framer-motion";

//-----------Components-----------//
import InputText from "../Details/InputText";
import InputDate from "../Details/InputDate";
import Button from "../Details/Button";

//-----------Utilities-----------//
import { bearerToken } from "../Utilities/token";

//-----------Media-----------//
import logo from "../Images/favicon_io/logo192.png";

export default function ApplicationPage() {
  const token = localStorage.getItem("token");

  const refresh = useOutletContext();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const { id } = useParams();
  const [formInfo, setFormInfo] = useState({
    userId: 1, //Set as 1 for now
    companyName: "",
    jobPosition: "",
    location: "",
    jobDescription: "",
    isBookmarked: false,
    color: "", // Default primary color
    statusId: "",
    applicationDate: "",
  });

  // GET - Retrieve application data from Backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/applications/${id}`, bearerToken(token)) // Endpoint: users/:userId/:applicationId
      .then((response) => {
        console.log("Single Application Endpoint", response.data.data);
        setFormInfo(response.data.data);
      });
  }, []);

  // PUT - Edit application details
  const updateDetails = () => {
    console.log("Details to be updated", formInfo);
    axios
      .put(`${BACKEND_URL}/applications/edit/${id}`, formInfo)
      .then((response) => {
        console.log("Update response", response);
        refresh();
      });
  };

  // DELETE - Delete application
  const deleteApplication = () => {
    axios
      .delete(`${BACKEND_URL}/applications/delete/${id}`, bearerToken(token))
      .then((response) => {
        console.log("Application Deleted", response);
        refresh();
        navigate("/dashboard");
      });
  };

  // Helper Functions
  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChange = (e) => {
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, statusId: value };
    });
  };

  const toggleIsBookmarked = () => {
    setFormInfo((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="absolute left-1/2 top-1/2 z-30 flex h-full max-h-[90%] w-full max-w-[95%] -translate-x-1/2 -translate-y-[47%] transform flex-col rounded-lg bg-slate-950 opacity-[0.95] shadow-lg shadow-secondary">
        <NavLink
          to="/dashboard"
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 "
        >
          ✕
        </NavLink>
        {/* Top header bar */}
        <header className="flex w-full flex-row items-center ">
          {/* Company & Job Position */}
          <div className="flex flex-row">
            <img
              src={logo}
              alt="company icon"
              className="m-3 h-[72px] rounded-full"
            />
            <main className="mt-3">
              <h1 className="text-[28px]">
                {formInfo && formInfo.companyName}
              </h1>
              <h2 className="">
                {formInfo && formInfo.jobPosition}{" "}
                {formInfo && formInfo.isBookmarked}
              </h2>
            </main>
          </div>
          {/* Bookmark */}
          <div
            className={`ml-5 mr-auto flex items-center justify-center  ${
              formInfo && formInfo.isBookmarked ? "text-red-500" : "text-text"
            }  hover:text-primary`}
          >
            <button
              className=" text-[28px] leading-none"
              onClick={toggleIsBookmarked}
            >
              ♥︎
            </button>
          </div>
          {/* Navigation */}
          <nav className="mr-12 flex flex-row gap-3">
            <NavLink
              to={`/dashboard/edit/${id}/notes`}
              className=" w-[110px] rounded-lg bg-primary px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-secondary"
            >
              Notes 📝
            </NavLink>
            <NavLink
              to={`/dashboard/edit/${id}/interview`}
              className=" w-[110px] rounded-lg bg-primary px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-secondary"
            >
              Interview 💼
            </NavLink>
            <NavLink
              to={`/dashboard/edit/${id}/reminders`}
              className=" w-[110px] rounded-lg bg-primary px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-secondary"
            >
              Reminders 🔔
            </NavLink>
            <NavLink
              to={`/dashboard/edit/${id}/contacts`}
              className=" w-[110px] rounded-lg bg-primary px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-secondary"
            >
              Contacts 👤
            </NavLink>
            <NavLink
              to={`/dashboard/edit/${id}/documents`}
              className=" w-[110px] rounded-lg bg-primary px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-secondary"
            >
              Documents 📁
            </NavLink>
            <button
              className=" w-[60px] rounded-lg bg-red-600 px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-red-800"
              onClick={() =>
                document.getElementById(`delete_modal${id}`).showModal()
              }
            >
              Delete
            </button>
            <dialog id={`delete_modal${id}`} className="modal">
              <div className="modal-box bg-background">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h1 className="py-4">
                  Are you sure you want to delete this application ?
                </h1>
                <Button
                  label="Delete"
                  handleClick={deleteApplication}
                  add="bg-red-600 hover:bg-red-800"
                />
              </div>
            </dialog>
          </nav>
        </header>
        {/* Main Edit section */}
        <div className=" mx-5 mb-5 flex h-full w-auto flex-row gap-3">
          {/* Job Details */}
          <main className=" flex h-full w-1/3 flex-col p-2">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className=" text-[20px] font-bold ">Application Details</h1>
                <h2 className="mb-2 text-[10px] ">
                  * indicates a required field
                </h2>
              </div>
              <Button label="Update" handleClick={updateDetails} add="h-8" />
            </div>

            <form className="grid grid-cols-2 gap-y-1 text-black">
              <p>Application Status: *</p>

              <select
                className="h-12 w-full rounded-lg border-[1px] border-text bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
                onChange={(e) => selectChange(e)}
                id="statusId"
                value={formInfo.statusId} // Set the defaultValue to an empty string
              >
                <option value="1">Wishlist</option>
                <option value="2">Applied</option>
                <option value="3">Screening</option>
                <option value="4">Interview</option>
                <option value="5">Offer</option>
              </select>

              <p className="">Company Name: *</p>
              <InputText
                id="companyName"
                placeholder="e.g. Microsoft"
                handleChange={textChange}
                value={formInfo.companyName}
              />

              <p className="">Job Position: *</p>
              <InputText
                id="jobPosition"
                placeholder="e.g. Software Engineer"
                handleChange={textChange}
                value={formInfo.jobPosition}
              />
              <p className="">Colour:</p>
              <input
                type="color"
                id="color"
                className="h-8 w-full cursor-pointer rounded-lg bg-transparent hover:translate-y-[-2px] "
                value={formInfo.color}
                onChange={textChange}
              />
              <p className="">Location:</p>
              <InputText
                id="location"
                placeholder="e.g. Singapore"
                handleChange={textChange}
                value={formInfo.location}
              />
              <p className="">Job Description:</p>
              <textarea
                id="jobDescription"
                className="rounded-lg border-[1px] border-text bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px] "
                onChange={textChange}
                value={formInfo.jobDescription}
                placeholder="5 years of experience"
                rows="7"
                cols="30"
              />

              <p>Application Date:</p>
              <InputDate
                id="applicationDate"
                value={formInfo.applicationDate}
                handleChange={textChange}
              />
            </form>
          </main>
          {/* Additional Details*/}
          <section className="w-2/3">
            <Outlet />
          </section>
        </div>
      </div>
    </motion.div>
  );
}
