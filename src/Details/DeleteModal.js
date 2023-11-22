import Button from "./Button";

const DeleteModal = ({ label, key, handleClick }) => {
  return (
    <>
      <button
        className=" w-[60px] rounded-lg bg-red-600 px-2 py-1 text-center hover:translate-y-[-2px] hover:bg-red-800"
        onClick={() =>
          document.getElementById(`delete_modal${key}`).showModal()
        }
      >
        Delete
      </button>
      <dialog id={`delete_modal${key}`} className="modal">
        <div className="modal-box bg-background">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="py-4">
            Are you sure you want to delete this {label} ?
          </h1>
          <Button
            label="Delete"
            handleClick={handleClick}
            add="bg-red-600 hover:bg-red-800"
          />
        </div>
      </dialog>
    </>
  );
};

export default DeleteModal;
