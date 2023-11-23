//-----------Library-----------//
import axios from "axios";
import { useState, useEffect } from "react";

//-----------Components-----------//
import ContactsAdd from "./ContactsAdd";
import InputDate from "../../../Details/InputDate";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const ContactsEdit = ({ currentContact, refresh }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [contactsData, setContactsData] = useState({
    contactName: "",
    companyName: "",
    jobPosition: "",
    email: "",
    notes: "",
    phoneNumber: "",
    lastContactedDate: "",
  });

  // Populate current interview Data
  useEffect(() => {
    if (currentContact) {
      const {
        id,
        contactName,
        companyName,
        jobPosition,
        email,
        notes,
        phoneNumber,
        lastContactedDate,
      } = currentContact;
      setContactsData({
        id,
        contactName,
        companyName,
        jobPosition,
        email,
        notes,
        phoneNumber,
        lastContactedDate,
      });
    }
  }, [currentContact]);

  // Edit contacts data
  const updateContacts = () => {
    console.log("Update Contact Info", contactsData);
    axios
      .put(
        `${BACKEND_URL}/contacts/edit/${contactsData.id}`,
        contactsData,
        bearerToken(token),
      )
      .then((response) => {
        setContactsData(response.data.data);
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setContactsData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="m-1 flex h-full w-full shrink-0 flex-col p-1 ">
      <div className="flex w-full flex-row justify-between rounded-lg bg-slate-500">
        <input
          id="contactName"
          className="w-full bg-transparent px-2 font-bold"
          type="text"
          value={contactsData && contactsData.contactName}
          onChange={textChange}
        />
        <button
          className="hoverfullorder-[1px] border-white bg-transparent px-2 text-xs"
          onClick={updateContacts}
        >
          Update
        </button>
      </div>
      <div className="m-2 mr-[250px] grid grid-cols-2 gap-y-2">
        <label>Company Name:</label>
        <input
          id="companyName"
          className="w-full rounded-lg border-[1px] border-white bg-transparent p-1"
          type="text"
          value={contactsData && contactsData.companyName}
          onChange={textChange}
        />
        <label>Job Position:</label>
        <input
          id="jobPosition"
          className="w-full rounded-lg border-[1px] border-white bg-transparent p-1"
          type="text"
          value={contactsData && contactsData.jobPosition}
          onChange={textChange}
        />
        <label>Email:</label>
        <input
          id="email"
          className="w-full rounded-lg border-[1px] border-white bg-transparent p-1"
          type="text"
          value={contactsData && contactsData.email}
          onChange={textChange}
        />
        <label>Phone Number:</label>
        <input
          id="phoneNumber"
          className="w-full rounded-lg border-[1px] border-white bg-transparent p-1"
          type="text"
          value={contactsData && contactsData.phoneNumber}
          onChange={textChange}
        />
        <label>Notes:</label>
        <input
          id="notes"
          className="w-full rounded-lg border-[1px] border-white bg-transparent p-1"
          type="text"
          value={contactsData && contactsData.notes}
          onChange={textChange}
        />
        <label>Last Contacted: *</label>
        <InputDate
          id="lastContactedDate"
          value={contactsData && contactsData.lastContactedDate}
          handleChange={textChange}
        />
      </div>

      <ContactsAdd
        appId={contactsData && contactsData.applicationId}
        refresh={refresh}
      />
    </div>
  );
};

export default ContactsEdit;
