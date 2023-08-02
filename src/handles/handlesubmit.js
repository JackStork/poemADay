import { addDoc, setDoc, doc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

async function handleSubmit(userData, poemData, dateData) {
  const ref = collection(firestore, dateData);

  const data = {
    poem: poemData,
  };

  await setDoc(doc(firestore, dateData, userData), {
    poem: poemData,
    likes: 0,
  });
}

export default handleSubmit;
