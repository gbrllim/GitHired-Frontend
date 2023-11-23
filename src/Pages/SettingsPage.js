//-----------Libaries-----------//
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//-----------Firebase-----------//
import { storage } from "../firebase/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

//-----------Components-----------//
import NavBar from "../Details/NavBar";
import InputText from "../Details/InputText";
import Button from "../Details/Button";
import ProfileImage from "../Details/ProfileImage.js";

//-----------Utilities-----------//
import { bearerToken } from "../Utilities/token.js";

//-----------Media-----------//
import logo from "../Images/Logo-GitHired.svg";
import defaultProfile from "../Images/defaultProfile.png";

export default function SettingsPage() {
  const token = localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    email: "email1234@email.com",
    firstName: "",
    lastName: "",
    profilePic: null,
    applicationGoalCount: "",
    questionsGoalCount: "",
  });
  const [file, setFile] = useState(null);

  // GET - exiting user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/users/data`,
          bearerToken(token),
        );
        const userData = response.data.userData;
        console.log("data", userData);
        setFormInfo(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const editUser = async () => {
    console.log("edit", formInfo);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/users/edit`,
        formInfo,
        bearerToken(token),
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Firebase: Upload image to firebase and retrieve the url
  useEffect(() => {
    if (file) {
      const fileRef = ref(storage, `profile-images/${file.name}`);
      uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          setFormInfo({ ...formInfo, profilePic: url });
          setFile(null);
          console.log("Image Uploaded", url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }, [file]);

  // Helper Functions
  const textChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const isFilled = () => {
    return formInfo.firstName.trim() !== "" && formInfo.lastName.trim() !== "";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File stored", file);
    setFile(file);
  };

  const tooltipStyle = {
    "--tooltip-color": "#1c3f58",
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <NavBar />
      <form className="flex flex-col items-center justify-center gap-2 text-black">
        <div
          className="tooltip "
          data-tip="📸 Update Profile Picture!"
          style={tooltipStyle}
        >
          <label htmlFor="profile-picture" style={{ cursor: "pointer" }}>
            <ProfileImage
              src={formInfo.profilePic ? formInfo.profilePic : defaultProfile}
              alt="Profile photo"
            />
          </label>
        </div>
        <input
          type="file"
          id="profile-picture"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <p className="">First Name:</p>
        <InputText
          id="firstName"
          placeholder="e.g. Ah"
          handleChange={textChange}
          value={formInfo.firstName}
        />
        <p className="">Last Name: </p>
        <InputText
          id="lastName"
          placeholder="e.g. Boy"
          handleChange={textChange}
          value={formInfo.lastName}
        />
        <p className="">Weekly Application Goals:</p>
        <InputText
          id="applicationGoalCount"
          placeholder="e.g. 5 applications/week"
          handleChange={textChange}
          value={formInfo.applicationGoalCount}
        />
        <p className="">Weekly Practice Goals: </p>
        <InputText
          id="questionsGoalCount"
          placeholder="e.g. 10 questions/week"
          handleChange={textChange}
          value={formInfo.questionsGoalCount}
        />
      </form>
      <Button label="Update" handleClick={editUser} add="my-1" />
      <Button label="Sign Out" handleClick={signOut} add="bg-red-700" />
    </div>
  );
}
