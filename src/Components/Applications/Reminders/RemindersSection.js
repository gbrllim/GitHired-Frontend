//-----------Libaries-----------//
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//-----------Components-----------//
import InputText from "../../../Details/InputText";
import Button from "../../../Details/Button";
import InputDate from "../../../Details/InputDate";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";
import ReminderCard from "./ReminderCard";

const RemindersSection = () => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();

  const [formInfo, setFormInfo] = useState({
    applicationId: id,
    reminderNote: "",
    reminderDate: "",
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    refreshReminders();
  }, []);

  // GET - exiting user data
  const refreshReminders = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/${id}/reminders`,
        bearerToken(token),
      );
      const remindersData = response.data.data;
      setData(remindersData);
    } catch (error) {
      console.error("Error fetching reminders data:", error);
    }
  };

  // POST - Create new reminder
  const newReminder = () => {
    console.log("sending", formInfo);
    axios
      .post(
        `${BACKEND_URL}/applications/reminders/create`,
        formInfo,
        bearerToken(token),
      )
      .then((response) => {
        refreshReminders();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Helper Functions
  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="flex  flex-col items-center">
      <header className="flex w-4/5 flex-row gap-2">
        <label className="">Create Reminder:</label>
        <InputText
          id="reminderNote"
          placeholder="2nd Interview round"
          handleChange={textChange}
          value={formInfo && formInfo.reminderNote}
        />
        <InputDate
          id="reminderDate"
          value={formInfo && formInfo.reminderDate}
          handleChange={textChange}
        />
        <Button label="Create" handleClick={newReminder} add="min-w-[80px]" />
      </header>
      <main className="mt-2 flex w-full flex-col items-center gap-2">
        {data &&
          data.map((reminder, index) => (
            <ReminderCard
              key={index}
              data={reminder}
              refresh={refreshReminders}
            />
          ))}
      </main>
    </div>
  );
};

export default RemindersSection;
