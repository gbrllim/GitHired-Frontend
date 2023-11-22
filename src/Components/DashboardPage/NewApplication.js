//-----------Library-----------//
import { useState } from "react";
import axios from "axios";

//-----------Components-----------//
import InputText from "../../Details/InputText";
import InputDate from "../../Details/InputDate";
import Button from "../../Details/Button";
import { useNavigate } from "react-router-dom";

const NewApplication = ({ refresh }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    userId: 1, // To change later once Auth done
    companyName: "",
    jobPosition: "",
    location: "",
    jobDescription: "",
    isBookmarked: false,
    color: "#1C3F58", // Default primary color
    statusId: "0",
    applicationDate: "",
  });

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

  // Data validation
  const isFilled = () => {
    return (
      formInfo.companyName.trim() !== "" &&
      formInfo.jobPosition.trim() !== "" &&
      formInfo.statusId.trim() !== "" &&
      formInfo.applicationDate.trim() !== ""
    );
  };

  const toggleIsBookmarked = () => {
    setFormInfo((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
    }));
  };

  const postNewApplication = async () => {
    try {
      const post = await axios.post(
        `${BACKEND_URL}/applications/create`,
        formInfo,
      );
      document.getElementById("new_application_modal").close(); // Close modal if successful
      refresh();
      setFormInfo({
        userId: 1, // To change later once Auth done
        companyName: "",
        jobPosition: "",
        location: "",
        jobDescription: "",
        isBookmarked: false,
        color: "#1C3F58", // Default primary color
        statusId: "0",
        applicationDate: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 h-[60px] w-[60px] rounded-full bg-primary text-[30px] leading-none shadow-md"
        onClick={() =>
          document.getElementById("new_application_modal").showModal()
        }
      >
        +
      </button>
      <dialog id="new_application_modal" className="modal  ">
        <div className="modal-box bg-slate-950 shadow-lg shadow-secondary">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 ">
              ✕
            </button>
          </form>
          <h1 className=" text-[20px] font-bold ">Create New Application</h1>
          <h2 className=" mb-2 text-[10px] ">* indicates a required field</h2>
          <form className="grid grid-cols-2 gap-y-1 text-black">
            <p>Application Status: *</p>

            <select
              className="h-12 w-full rounded-lg border-[1px] border-text bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
              onChange={(e) => selectChange(e)}
              id="statusId"
              defaultValue="0" // Set the defaultValue to an empty string
            >
              <option value="0" disabled>
                Choose One
              </option>
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

            <p>Application Date: *</p>
            <InputDate
              id="applicationDate"
              value={formInfo.applicationDate}
              handleChange={textChange}
            />
          </form>

          <div className="mt-2 flex w-full justify-center">
            <Button
              label="Create"
              handleClick={postNewApplication}
              disabled={!isFilled()}
            />
            <div
              className={`flex items-center justify-center ${
                formInfo.isBookmarked ? "text-red-500" : "text-text"
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
      </dialog>
    </div>
  );
};

export default NewApplication;
