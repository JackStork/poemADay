import "../styles/App.scss";
import React, { useState, useEffect, useRef } from "react";
//import { googleLogout, useGoogleLogin } from "@react-oauth/google";
//import axios from "axios";
import handleSubmit from "../handles/handlesubmit";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import YourPost from "./YourPost";

// Get date to display next to title
const date = new Date();
let day = date.getDate();
day = day < 10 ? "0" + day.toString() : day;
let month = date.getMonth() + 1;
month = month < 10 ? "0" + month.toString() : month;
let year = date.getFullYear();
let shortDate = `${day}/${month}/${year}`;

function App() {
  // Google login test stuff
  //const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const tempData = {
    poem: "THIS IS A\nTEST",
    likes: 1,
  };

  /*
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
  */

  // For firebase poem uploading
  const dataRef = useRef();

  const submithandler = () => {
    console.log(dataRef.current.value);
    handleSubmit(user.email, dataRef.current.value, `${day}${month}${year}`);
    dataRef.current.value = "";
  };

  // For Firebase authentication w Google
  // NOTE: May not actually want Firebase auth on client side. May want a backend
  // server for that purpose
  const firebaseSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/firebase");

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const firebaseSignOut = () => {
    const auth = getAuth();
    signOut(auth);
    setUser(null);
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
            ref={dataRef}
            maxLength={10000}
            //onChange will be used for saving field value when refreshed
          />
          <div className="PoemEntryBoxBelow">
            {user ? (
              <button onClick={firebaseSignOut}>Sign Out</button>
            ) : (
              <button onClick={firebaseSignIn}>Sign in with Google</button>
            )}
            <button onClick={submithandler} className="PoemEntryBoxBelowSubmit">
              ✓
            </button>
          </div>
        </div>
      </div>
      <hr className="TitleLine" />
      <div className="Posts">
        <YourPost postData={tempData} />
      </div>
    </div>
  );
}

export default App;
