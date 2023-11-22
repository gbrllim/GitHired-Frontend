//-----------Library-----------//
import axios from "axios";
import { useState, useEffect } from "react";

//-----------Components-----------//
import NotesAdd from "./NotesAdd";

const NotesEdit = ({ currentNote, refresh }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [noteData, setNoteData] = useState({
    id: null,
    applicationId: null,
    title: "",
    content: "",
  });

  // Populate current Note Data
  useEffect(() => {
    if (currentNote) {
      const { id, applicationId, title, content } = currentNote;
      setNoteData({ id, applicationId, title, content });
    }
  }, [currentNote]);

  // Edit notes data
  const updateNote = () => {
    axios
      .put(`${BACKEND_URL}/applications/notes/edit/${noteData.id}`, noteData)
      .then((response) => {
        setNoteData(response.data.data);
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setNoteData((prevState) => {
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
          value={noteData && noteData.title}
          onChange={textChange}
        />
        <button
          className="px-2 text-xs hover:text-slate-400"
          onClick={updateNote}
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
        value={noteData && noteData.content}
        onChange={textChange}
      />
      <NotesAdd appId={noteData && noteData.applicationId} refresh={refresh} />
    </div>
  );
};

export default NotesEdit;
