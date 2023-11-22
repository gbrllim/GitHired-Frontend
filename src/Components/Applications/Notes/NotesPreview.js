//-----------Library-----------//
import axios from "axios";

//-----------Components-----------//
import Button from "../../../Details/Button";
import { bearerToken } from "../../../Utilities/token";

const NotesPreview = ({ data, select, refresh }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { id, applicationId, title, content } = data;

  const previewContent =
    content.length > 60 ? `${content.substring(0, 80)}...` : content;

  const deleteNote = async () => {
    axios
      .delete(
        `${BACKEND_URL}/applications/notes/delete/${id}`,
        bearerToken(token),
      )
      .then(() => {
        document.getElementById(`delete_note_modal${id}`).close();
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="m-1 flex w-[280px] flex-row rounded-md bg-slate-600">
      <button
        className=" flex h-[60px] w-full flex-col rounded-md p-1 hover:bg-slate-500"
        onClick={() => select(id)}
      >
        <h1 className=" text-sm ">{title}</h1>
        <h1 className="text-left text-[10px] ">{previewContent}</h1>
      </button>
      <button
        className="text-md mb-auto ml-auto w-4 rounded-bl-md rounded-tr-md bg-slate-700 p-1 leading-none hover:text-slate-400"
        onClick={() =>
          document.getElementById(`delete_note_modal${id}`).showModal()
        }
      >
        x
      </button>
      <dialog id={`delete_note_modal${id}`} className="modal">
        <div className="modal-box bg-background">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="py-4">Are you sure you want to delete this note ?</h1>
          <Button
            label="Delete"
            handleClick={deleteNote}
            add="bg-red-600 hover:bg-red-800"
          />
        </div>
      </dialog>
    </div>
  );
};

export default NotesPreview;
