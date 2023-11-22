//-----------Library-----------//
import axios from "axios";
import { useState, useEffect } from "react";

//-----------Components-----------//
import InterviewAdd from "./InterviewAdd";

const InterviewEdit = ({ currentInterview, refresh }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [interviewData, setinterviewData] = useState({
    id: null,
    applicationId: null,
    title: "",
    content: "",
  });

  // Populate current interview Data
  useEffect(() => {
    if (currentInterview) {
      const { id, applicationId, title, content } = currentInterview;
      setinterviewData({ id, applicationId, title, content });
    }
  }, [currentInterview]);

  // Edit interview data
  const updateInterview = () => {
    axios
      .put(
        `${BACKEND_URL}/applications/interviews/edit/${interviewData.id}`,
        interviewData,
      )
      .then((response) => {
        setinterviewData(response.data.data);
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setinterviewData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="m-1 flex h-full w-full shrink-0 flex-col p-1 ">
      <div className="flex w-full flex-row justify-between rounded-lg bg-slate-500">
        <input
          id="title"
          className="w-full bg-transparent px-2 font-bold"
          type="text"
          value={interviewData && interviewData.title}
          onChange={textChange}
        />
        <button
          className="px-2 text-xs hover:text-slate-400"
          onClick={updateInterview}
        >
          Update
        </button>
      </div>

      <textarea
        id="content"
        className="w-full bg-slate-600 p-1"
        type="text"
        rows="21"
        cols="30"
        value={interviewData && interviewData.content}
        onChange={textChange}
      />
      <InterviewAdd
        appId={interviewData && interviewData.applicationId}
        refresh={refresh}
      />
    </div>
  );
};

export default InterviewEdit;
