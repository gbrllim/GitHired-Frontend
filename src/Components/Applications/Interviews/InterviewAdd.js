import axios from "axios";
import { useState } from "react";

const InterviewAdd = ({ appId, refresh }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [interviewData] = useState({
    applicationId: appId,
    title: "New Interview",
    content: "Edit Content",
  });

  const newInterview = () => {
    console.log("data to be sent", interviewData);

    axios
      .post(`${BACKEND_URL}/applications/interviews/create`, interviewData)
      .then((response) => {
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 h-[60px] w-[60px] rounded-full bg-primary text-[30px] leading-none shadow-md"
        onClick={newInterview}
      >
        +
      </button>
    </div>
  );
};

export default InterviewAdd;
