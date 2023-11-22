//-----------Libaries-----------//
import axios from "axios";
import { useState } from "react";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const NotesAdd = ({ appId, refresh }) => {
  const token = localStorage.getItem("token");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const id = appId;

  const [noteData] = useState({
    applicationId: id,
    title: "New Note",
    content: "Edit Content",
  });

  const newNote = () => {
    console.log("data to be sent", noteData);

    axios
      .post(
        `${BACKEND_URL}/applications/notes/create`,
        noteData,
        bearerToken(token),
      )
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
        className="fixed bottom-10 right-10 h-[60px] w-[60px] rounded-full bg-primary text-[30px] leading-none shadow-md hover:translate-y-[-2px]"
        onClick={newNote}
      >
        +
      </button>
    </div>
  );
};

export default NotesAdd;
