//-----------Library-----------//
import axios from "axios";

//-----------Components-----------//
import Button from "../../../Details/Button";
import CalendarButton from "./CalendarButton";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const ReminderCard = ({ data, refresh }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const deleteInterview = async () => {
    axios
      .delete(
        `${BACKEND_URL}/applications/reminders/delete/${data.id}`,
        bearerToken(token),
      )
      .then(() => {
        document.getElementById(`delete_reminder_modal${data.id}`).close();
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex h-12  w-4/5 flex-row items-center justify-between rounded-lg bg-slate-600 px-2">
        <h1 className="w-[220px] text-sm">{data.reminderNote}</h1>
        <h1 className="text-sm">{data.reminderDate}</h1>
        <nav>
          <CalendarButton
            startTime={data.reminderDate}
            title={data.reminderNote}
          />
          <button
            className="text-md mb-auto ml-auto w-2 leading-none hover:text-slate-400"
            onClick={() =>
              document
                .getElementById(`delete_reminder_modal${data.id}`)
                .showModal()
            }
          >
            x
          </button>
          <dialog id={`delete_reminder_modal${data.id}`} className="modal">
            <div className="modal-box bg-background">
              <form method="dialog">
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h1 className="py-4">
                Are you sure you want to delete this reminder ?
              </h1>
              <Button
                label="Delete"
                handleClick={deleteInterview}
                add="bg-red-600 hover:bg-red-800"
              />
            </div>
          </dialog>
        </nav>
      </div>
    </>
  );
};

export default ReminderCard;
