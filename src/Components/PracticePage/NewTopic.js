//-----------Library-----------//
import { useState } from "react";
import axios from "axios";

//-----------Components-----------//
import InputText from "../../Details/InputText";
import InputDate from "../../Details/InputDate";
import Button from "../../Details/Button";
import { useNavigate } from "react-router-dom";

const NewTopic = ({ isOpen, onClose }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    userId: 1, // To change later once Auth done
    title: "",
    link: "",
    categoryId: "",
    difficultyId: "",
    statusId: false,
    platformId: "",
    notes: "",
    starred: false,
  });

  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //Data validation
  const isFilled = () => {
    return formInfo.title.trim() !== "" && formInfo.link.trim() !== "";
  };

  const toggleStarred = () => {
    setFormInfo((prevState) => ({
      ...prevState,
      starred: !prevState.starred,
    }));
  };

  const postNewApplication = async () => {
    console.log("Data sending", formInfo);

    try {
      const post = await axios.post(
        `${BACKEND_URL}/applications/create`,
        formInfo,
      );
      onClose()
      navigate("/dashboard");
      console.log("Post data", post);
    } catch (err) {
      console.log(err);
    }
  };

  const setDifficulty = (difficultyId) => {
    setFormInfo((prevState) => ({
      ...prevState,
      difficultyId: difficultyId,
    }));
  };

  if (!isOpen) return null;

  return (
    <div>
      {isOpen && (
        <dialog id="new_topic_modal" className="modal">
          <div className="modal-box bg-slate-950 shadow-lg shadow-secondary">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
            <h1 className=" text-[20px] font-bold ">Add New Question</h1>
            <h2 className=" mb-2 text-[10px] ">* indicates a required field</h2>
            <form className="grid grid-cols-2 gap-y-1 text-black">
              <p className="">Title: *</p>
              <InputText
                id="title"
                placeholder="e.g. 1.Two Sum"
                handleChange={textChange}
                value={formInfo.title}
              />

              <p className="">Link: *</p>
              <InputText
                id="link"
                placeholder="e.g. https://leetcode.com/problems/maximum-subarray/description/"
                handleChange={textChange}
                value={formInfo.link}
              />

              <p>Platform: *</p>

              <select
                className="h-12 w-full rounded-lg border-[1px] border-text bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
                onChange={(e) => selectChange(e)}
                id="platformId"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose One
                </option>
                <option value="1">Leetcode</option>
                <option value="2">Hackerrank</option>
                <option value="3">Neetcode</option>
                <option value="4">Kaggle</option>
                <option value="5">Others</option>
              </select>

              <p>Difficulty: *</p>
              <div className="h-12 w-full space-x-5 border-text bg-transparent p-2 text-text hover:translate-y-[-2px] ">
                <button
                  type="button"
                  className={`btn text-xs ${
                    formInfo.difficultyId === "1"
                      ? "bg-green-600 text-white"
                      : "bg-green-200 text-green-800"
                  } px-2 py-1 transition duration-300 ease-in-out`}
                  onClick={() => setDifficulty("1")}
                >
                  Easy
                </button>
                <button
                  type="button"
                  className={`btn text-xs ${
                    formInfo.difficultyId === "2"
                      ? "bg-orange-600 text-white"
                      : "bg-orange-200 text-orange-800"
                  } px-2 py-1 transition duration-300 ease-in-out`}
                  onClick={() => setDifficulty("2")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`btn text-xs ${
                    formInfo.difficultyId === "3"
                      ? "bg-red-600 text-white"
                      : "bg-red-200 text-red-800"
                  } px-2 py-1 transition duration-300 ease-in-out`}
                  onClick={() => setDifficulty("3")}
                >
                  Hard
                </button>
              </div>

              <p className="">Notes:</p>
              <textarea
                id="notes"
                className="mt-3 rounded-lg border-[1px] border-text bg-transparent p-2 text-text hover:translate-y-[-2px] hover:border-[2px]"
                onChange={textChange}
                value={formInfo.notes}
                placeholder="Initialize a dummy node then assign tail to this dummy node"
                rows="7"
                cols="30"
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
                  formInfo.starred ? "text-yellow-500" : "text-text"
                }  hover:text-primary`}
              >
                <button
                  className=" text-[28px] leading-none"
                  onClick={toggleStarred}
                >
                  ★
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default NewTopic;
