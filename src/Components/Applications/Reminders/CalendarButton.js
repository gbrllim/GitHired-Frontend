import React from "react";

function CalendarButton({ startTime, title }) {
  const generateCalendarLink = () => {
    const startTimestamp = startTime.replace(/-/g, "");
    // Construct a Google Calendar event URL
    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimestamp}/${startTimestamp}&sprop=name:GitHired`;

    // Open the event in a new tab
    window.open(googleCalendarURL, "_blank");
  };

  return (
    <button
      onClick={generateCalendarLink}
      className="rounded-full p-[9px] text-lg leading-[18px] hover:bg-slate-400"
    >
      🗓️
    </button>
  );
}

export default CalendarButton;
