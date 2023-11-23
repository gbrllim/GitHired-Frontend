import { getUpcomingText } from "../../../Utilities/formatting";

const RemindersSummary = ({ data }) => {
  const { reminderNote, reminderDate } = data;

  return (
    <div className="m-1 flex w-[320px] flex-row items-center justify-between rounded-lg bg-background p-2">
      <p className="text-sm">{reminderNote}</p>
      <p className="text-xs"> {getUpcomingText(reminderDate)} </p>
    </div>
  );
};

export default RemindersSummary;
