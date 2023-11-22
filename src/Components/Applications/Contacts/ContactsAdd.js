//-----------Library-----------//
import axios from "axios";
import { useState } from "react";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const ContactsAdd = ({ appId, refresh }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [contactsData] = useState({
    contactName: "",
    companyName: "",
    jobPosition: "",
    email: "",
    notes: "",
    phoneNumber: "",
    lastContactedDate: new Date(),
    applicationId: appId,
  });

  const newContact = () => {
    console.log("data to be sent", contactsData);

    axios
      .post(`${BACKEND_URL}/contacts/create`, contactsData, bearerToken(token))
      .then((response) => {
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 h-[60px] w-[60px] rounded-full bg-primary text-[30px] leading-none shadow-md"
        onClick={newContact}
      >
        +
      </button>
    </div>
  );
};

export default ContactsAdd;
