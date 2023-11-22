//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//-----------Components-----------//
import InterviewAdd from "./InterviewAdd";
import InterviewEdit from "./InterviewEdit";
import InterviewPreview from "./InterviewPreview";

const InterviewSection = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();

  const [currentInterview, setCurrentInterview] = useState(null);
  const [data, setData] = useState(null);

  // Initial request
  useEffect(() => {
    refresh();
  }, []);

  // Refresh data from db
  const refresh = () => {
    axios
      .get(`${BACKEND_URL}/users/1/${id}/interviews`)
      .then((response) => {
        console.log("interview data", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Allows toggling between interviews
  const select = (id) => {
    setCurrentInterview(id);
  };

  // Function to sort a single data point by id
  const findDataById = (id) => {
    return data && data.find((item) => item.id === id);
  };

  // Request data by id
  const currentInterviewData = findDataById(currentInterview);

  return (
    <div className="flex h-full w-full flex-row ">
      <aside className="w-1/3 overflow-y-auto">
        <div className="flex h-[200px] flex-col">
          {data &&
            data.map((interview, index) => (
              <InterviewPreview
                key={index}
                data={interview}
                select={select}
                refresh={refresh}
              />
            ))}
        </div>
      </aside>
      <main className="m-1 w-2/3 rounded-lg bg-slate-600">
        {currentInterviewData ? (
          <InterviewEdit
            currentInterview={currentInterviewData}
            refresh={refresh}
          />
        ) : (
          <p className="text-center">Click on the left to open a Interview</p>
        )}
        <InterviewAdd appId={id} refresh={refresh} />
      </main>
    </div>
  );
};

export default InterviewSection;
