import "../styles/YourPost.scss";
import React, { useState, useEffect, useRef, Component } from "react";
import thumbsup from "../assets/thumbs-up.png";
import { firestore } from "../firebase_setup/firebase";
import {
  query,
  doc,
  collection,
  getDocs,
  QuerySnapshot,
  documentId,
  where,
} from "firebase/firestore";

function YourPost({ postData }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const ref = collection(firestore, "07082023");
      const q = query(
        ref,
        where(documentId(), "==", "cardinalsguy13@gmail.com")
      );
      try {
        const data = await getDocs(q);
        data.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <text>LOADING</text>;
  }

  if (error) {
    return <text>ERROR</text>;
  }

  return (
    <div className="YourPost">
      <div className="YourPostAuthor">
        <text className="YourPostAuthorText">Your Poem:</text>
      </div>
      <div className="YourPostContent">
        <text className="YourPostContentPoem">{postData.poem}</text>
        <div className="YourPostContentBar">
          <div className="YourPostContentBarLike">
            <img
              className="YourPostContentBarLikeImage"
              src={thumbsup}
              alt="Likes"
            />
            <text>{postData.likes}</text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPost;
