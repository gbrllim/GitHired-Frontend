//-----------Libaries-----------//
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

//-----------Components-----------//
import Button from "../Details/Button";
import InputText from "../Details/InputText";
import RotatingWords from "../Components/HomePage/RotatingWords";

//-----------Media-----------//
import logo from "../Images/Logo-GitHired.svg";
import demo from "../Images/Mock-demo.png";

export default function HomePage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const rotatingText = ["Applications", "Reminders", "Questions", "Notes"];
  const [data, setData] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const sendMagicLinkEmail = async () => {
    console.log("Data sending", data);
    try {
      const post = await axios.post(`${BACKEND_URL}/auth/login`, data);
      console.log("Post data", post);
      setMessage("Check your inbox for the magic link 📧");
      setSuccess(!success);
    } catch (err) {
      console.log(err);
      setMessage("Issue logging in, please try again");
    }
  };

  const isFilled = () => {
    return data.email.trim() !== "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }} // Initial state (hidden and scaled down)
      animate={{ opacity: 1, scale: 1 }} // Final state (visible and at full scale)
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className=" flex h-screen flex-row items-center justify-center bg-background"
    >
      <main className="flex w-1/2 flex-col items-center justify-center">
        <img src={logo} className="scale-125" alt="GitHired Logo" />
        <RotatingWords words={rotatingText} />
        <p className="mb-2 rounded-lg bg-secondary px-2">{message}</p>
        {!success && (
          <div className="flex flex-row">
            <form>
              <InputText
                placeholder="Enter your email"
                id="email"
                value={data.email}
                handleChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </form>
            <Button
              label="Enter"
              handleClick={sendMagicLinkEmail}
              disabled={!isFilled()}
            />
          </div>
        )}
        <NavLink to="/onboarding">Onboarding Flow</NavLink>
        <NavLink to="/dashboard">Try the app</NavLink>
      </main>
      <article className=" flex h-full w-1/2 items-center justify-center bg-primary">
        <img
          className="max-h-[400px]"
          src={demo}
          alt="Illustration of GitHired's Dashboard"
        />
      </article>
      <footer></footer>
    </motion.div>
  );
}
