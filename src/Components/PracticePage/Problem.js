const Problem = ({
  title,
  link,
  notes,
  difficulty,
  statusId,
  starred,
  onSolvedChange,
  onStarredChange,
  onEditClick,
}) => (
  <div className="flex items-center justify-between border-b border-gray-600 p-2">
    <span className="w-1/12">
      <input
        type="checkbox"
        checked={statusId === 1}
        onChange={onSolvedChange}
        className="h-4 w-4 rounded border-gray-300 checked:bg-green-500"
      />
    </span>
    <span className="w-1/12" onClick={onStarredChange}>
      <span
        className={`icon cursor-pointer ${
          starred ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        ★
      </span>
    </span>
    <span className="w-5/12 text-white">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500"
      >
        {title}
      </a>
    </span>
    <span className="w-4/12 text-gray-300">
      {notes}
      <button onClick={onEditClick} className="icon ml-2">
        ✎
      </button>
    </span>
    <span className="w-1/12">
      <button
        className={`btn btn-xs ${
          difficulty === "Easy" ? "btn-success" : "btn-error"
        }`}
      >
        {difficulty}
      </button>
    </span>
  </div>
);

export default Problem;