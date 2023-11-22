//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//-----------Components-----------//
import ContactsAdd from "./ContactsAdd";
import ContactsEdit from "./ContactsEdit";
import ContactsPreview from "./ContactsPreview";

//-----------Utilities-----------//
import { bearerToken } from "../../../Utilities/token";

const ContactsSection = () => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();

  const [currentContact, setCurrentContact] = useState(null);
  const [data, setData] = useState(null);

  // Initial request
  useEffect(() => {
    refresh();
  }, []);

  // Refresh data from db
  const refresh = () => {
    axios
      .get(`${BACKEND_URL}/users/${id}/contacts`, bearerToken(token))
      .then((response) => {
        console.log("contacts data", response.data.contacts);
        setData(response.data.contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Allows toggling between interviews
  const select = (id) => {
    setCurrentContact(id);
  };

  // Function to sort a single data point by id
  const findDataById = (id) => {
    return data && data.find((item) => item.id === id);
  };

  // Request data by id
  const currentContactData = findDataById(currentContact);

  return (
    <div className="flex h-full w-full flex-row ">
      <aside className="flex w-1/3 flex-col items-center overflow-y-auto">
        <h1 className="ml-2">Contacts 👤</h1>
        <div className="flex h-[200px] flex-col">
          {data &&
            data.map((contact, index) => (
              <ContactsPreview
                key={index}
                data={contact}
                select={select}
                refresh={refresh}
              />
            ))}
        </div>
      </aside>
      <main className="m-1 w-2/3 rounded-lg bg-slate-600">
        {currentContactData ? (
          <ContactsEdit currentContact={currentContactData} refresh={refresh} />
        ) : (
          <p className="text-center">Click on the left to open a Contact</p>
        )}
        <ContactsAdd appId={id} refresh={refresh} />
      </main>
    </div>
  );
};

export default ContactsSection;
