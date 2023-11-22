import axios from "axios";
import { useState, useEffect } from "react";

const NotesAdd = ({ appId, refresh }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [noteData] = useState({
    applicationId: appId,
    title: "New Note",
    content: "Edit Content",
  });

  const newNote = () => {
    console.log("data to be sent", noteData);

    axios
      .post(`${BACKEND_URL}/applications/notes/create`, noteData)
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
        onClick={newNote}
      >
        +
      </button>
    </div>
  );
};

export default NotesAdd;
