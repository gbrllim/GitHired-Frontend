//-----------React-----------//
import React from "react";

//-----------Providers-----------//
import Routes from "./Providers/RouterProvider";
import ContextProvider from "./Providers/ContextProvider";
//-----------Styling-----------//
import "./App.css";

export default function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}
