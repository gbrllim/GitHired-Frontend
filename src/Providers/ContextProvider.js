// Not in use

//-----------React-----------//
import React from "react";
import { useState } from "react";

export const GlobalContext = React.createContext(null);

export default function ContextProvider({ children }) {
  const [email, setEmail] = useState("test@test.com");

  const context = {
    email,
    setEmail,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}
