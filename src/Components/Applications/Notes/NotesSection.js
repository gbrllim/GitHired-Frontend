//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//-----------Components-----------//
import NotesPreview from "./NotesPreview";
import NotesEdit from "./NotesEdit";
import NotesAdd from "./NotesAdd";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const NotesSection = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [currentNote, setCurrentNote] = useState(null);
  const [data, setData] = useState(null);

  // Initial request
  useEffect(() => {
    refresh();
  }, []);

  // Refresh data from db
  const refresh = () => {
    axios
      .get(`${BACKEND_URL}/users/${id}/notes`, bearerToken(token))
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Allows toggling between notes
  const select = (id) => {
    setCurrentNote(id);
  };

  // Function to sort a single data point by appId
  const findDataById = (id) => {
    return data && data.find((item) => item.id === id);
  };

  // Request data by appId
  const currentNoteData = findDataById(currentNote);

  return (
    <div className="flex h-full w-full flex-row ">
      <aside className="w-1/3 overflow-y-auto">
        <div className="flex h-[200px] flex-col">
          {console.log("data", data)}
          {data &&
            data.map((note, index) => (
              <NotesPreview
                key={index}
                data={note}
                select={select}
                refresh={refresh}
              />
            ))}
        </div>
      </aside>
      <main className="m-1 w-2/3 rounded-lg bg-slate-600">
        {currentNoteData ? (
          <NotesEdit currentNote={currentNoteData} refresh={refresh} />
        ) : (
          <p className="text-center">Click on the left to open a note</p>
        )}
        <NotesAdd appId={id} refresh={refresh} />
      </main>
    </div>
  );
};

export default NotesSection;
