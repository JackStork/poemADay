import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import handleSubmit from "./handles/handlesubmit";

// Get date to display next to title
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let shortDate = `${day}/${month + 1}/${year}`;

function App() {
  // Google login test stuff
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [userPoem, setUserPoem] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log("LOGGED IN");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    console.log("LOGGED OUT");
  };

  // For firebase testing
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit("TEST");
    dataRef.current.value = "";
  };

  return (
    <div className="App">
      <div className="Title">
        <text className="TitleName">Poem a Day</text>
        <text className="TitleDate">{shortDate}</text>
      </div>
      <hr className="TitleLine" />
      <div className="PoemEntry">
        <div className="PoemEntryDetails">
          <div className="PoemEntryDetailsSubject">
            <text className="PoemEntryDetailsSubjectSubject">Subject:</text>
            <text className="PoemEntryDetailsSubjectValue">Death</text>
          </div>
          <div className="PoemEntryDetailsForm">
            <text className="PoemEntryDetailsFormForm">Form:</text>
            <text className="PoemEntryDetailsFormValue">Ghazal</text>
          </div>
        </div>
        <div className="PoemEntryBox">
          <textarea
            type="text"
            className="PoemEntryBoxBox"
            id="PoemEntryBoxBox"
            ref={dataRef}
            //onChange will be used for saving field value when refreshed
          />
          <div className="PoemEntryBoxBelow">
            {profile ? (
              <button onClick={() => logOut()}>Sign Out</button>
            ) : (
              <button onClick={() => login()}>Sign in with Google</button>
            )}
            <button onClick={submithandler} className="PoemEntryBoxBelowSubmit">
              ✓
            </button>
          </div>
        </div>
      </div>
      <hr className="TitleLine" />
      <div className="Posts"></div>
    </div>
  );
}

export default App;
