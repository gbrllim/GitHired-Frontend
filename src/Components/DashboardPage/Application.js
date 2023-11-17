import { NavLink } from "react-router-dom";

const Application = ({ application }) => {
  const { id, companyName, jobPosition, updatedAt, color, is_bookmarked } =
    application;
  return (
    <NavLink
      to={`/dashboard/edit/${id}`}
      className="m-1 flex h-[80px] flex-row rounded-lg shadow-lg shadow-primary hover:translate-y-[-2px]"
    >
      {/* Color coding for applications */}
      <div
        className="w-[12px] rounded-l-lg"
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="flex w-[200px] flex-col bg-text p-2">
        <p className="text-left text-[18px] leading-none text-black">
          {companyName}
        </p>
        <p className="text-left text-xs font-semibold text-black">
          {jobPosition}
        </p>
        <p className="mt-auto text-left text-[10px] leading-none text-primary">
          {updatedAt}
        </p>
      </div>
      <div
        className={`${
          is_bookmarked ? "text-red-500" : "text-accent"
        } w-[40px] rounded-r-lg bg-text p-1 pr-2 text-end`}
      >
        <button className="mb-auto text-[22px] leading-none">♥︎</button>
      </div>
    </NavLink>
  );
};

export default Application;
