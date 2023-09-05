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

export const firebaseSignIn = () => {
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

export const firebaseSignOut = () => {
  const auth = getAuth();
  signOut(auth);
  dispatch(update(user));
};
