import "../styles/App.scss";
import React, { useState, useEffect, useRef } from "react";
import submitPoemHandle from "../handles/handlesubmit";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import YourPost from "./YourPost";
import displayDate from "../utils/displayDate";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../userSlice";
import { firebaseSignIn, firebaseSignOut } from "../utils/firebaseSignInOut";

function App() {
  /*
  const [user, setUser] = useState(null);
  */
  // Redux testing
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // For firebase poem uploading
  const dataRef = useRef();

  const submitPoem = () => {
    console.log(dataRef.current.value);
    submitPoemHandle(user.email, dataRef.current.value, displayDate());
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
        dispatch(update(user));
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
    dispatch(update(user));
  };

  return (
    <div className="App">
      <div className="Title">
        <text className="TitleName">Poem a Day</text>
        <text className="TitleDate">{displayDate()}</text>
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
            <button onClick={submitPoem} className="PoemEntryBoxBelowSubmit">
              ✓
            </button>
          </div>
        </div>
      </div>
      <hr className="TitleLine" />
      <div className="Posts">
        {user ? (
          <YourPost postData={{ poem: "THIS IS A\nTEST", likes: 1 }} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
