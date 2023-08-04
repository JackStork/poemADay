import "../styles/YourPost.scss";
import React, { useState, useEffect, useRef } from "react";

function YourPost({ postData }) {
  return (
    <div classname="YourPost">
      <div classname="YourPostAuthor">
        <text classname="YourPostAuthorText">Your Poem:</text>
      </div>
      <div className="YourPostContent"></div>
    </div>
  );
}

export default YourPost;
