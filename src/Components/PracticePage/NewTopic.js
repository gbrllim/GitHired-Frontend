//-----------Library-----------//
import { useState } from "react";
import axios from "axios";

//-----------Components-----------//
import InputText from "../../Details/InputText";
import Button from "../../Details/Button";

//-----------Utitlies-----------//
import { bearerToken } from "../../Utilities/token";

const NewTopic = ({ refreshing }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [topicName, setTopicName] = useState("");

  const textChange = (e) => {
    setTopicName(e.target.value);
  };

  //Data validation
  const isFilled = () => {
    return topicName.trim() !== "";
  };

  const postNewCategory = async () => {
    if (!isFilled()) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/questions/newCategory`,
        {
          categoryName: topicName,
        },
        bearerToken(token),
      );
      console.log("Response:", response.data);
      setTopicName("");
      refreshing();
      document.getElementById("new_topic_modal").close();
    } catch (err) {
      console.error("Error posting new topic: ", err);
    }
  };

  return (
    <div>
      <button
        className="mt-0.4 w-full rounded bg-gray-700 p-3 text-left text-white"
        onClick={() => document.getElementById("new_topic_modal").showModal()}
      >
        + <strong>Add New Topic</strong>
      </button>
      <dialog id="new_topic_modal" className="modal">
        <div className="modal-box bg-slate-950 shadow-lg shadow-secondary">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 ">
              ✕
            </button>
          </form>
          <h1 className=" text-[20px] font-bold ">Add New Topic</h1>
          <h2 className=" mb-2 text-[10px] ">* indicates a required field</h2>
          <form className="grid grid-cols-2 gap-y-1 text-black">
            <p className="">Topic Name: *</p>
            <InputText
              id="categoryName"
              placeholder="e.g. Queues"
              handleChange={textChange}
              value={topicName}
            />
          </form>
          <div className="mt-2 flex w-full justify-center">
            <Button
              label="Create"
              handleClick={postNewCategory}
              disabled={!isFilled()}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewTopic;
