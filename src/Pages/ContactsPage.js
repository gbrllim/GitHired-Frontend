//-----------Libaries-----------//
import axios from "axios";
import { useEffect, useState } from "react";

//-----------Components-----------//
import NavBar from "../Details/NavBar";

//-----------Utlities-----------//
import { bearerToken } from "../Utilities/token";
import ContactPreview from "../Components/Contacts/ContactCard";

//-----------Media-----------//

export default function ContactsPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);

  useEffect(() => {
    refreshContacts();
  }, []);

  const refreshContacts = () => {
    axios
      .get(`${BACKEND_URL}/contacts/all`, bearerToken(token))
      .then((response) => {
        console.log("contacts Pulled", response.data);
        setData(response.data.contacts);
      });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <NavBar />
      <div className="grid grid-cols-3">
        {data &&
          data.map((contact, index) => (
            <ContactPreview key={index} data={contact} />
          ))}
      </div>
    </div>
  );
}
