const ProgressBar = ({ progress }) => {
  return (
    <div className="h-4 w-full rounded-full bg-gray-600">
      <div
        className="h-full rounded-full bg-green-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
