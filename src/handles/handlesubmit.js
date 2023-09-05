import { addDoc, setDoc, doc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

// For submitting poems to Firestore
async function submitPoemHandle(userData, poemData, dateData) {
  const ref = collection(firestore, dateData);

  await setDoc(doc(firestore, dateData, userData), {
    poem: poemData,
    likes: 1,
  });
}

export default submitPoemHandle;
