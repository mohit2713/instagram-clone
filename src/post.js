import React from "react";
// import img from "./images/testimg.webp";
import "./post.css";
import Avatar from "@mui/material/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          classNam="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3 className="postheader__text">{username}</h3>
      </div>
      <img className="post__img" src={imageUrl} alt="img" />
      {/* image */}
      <h1 className="post__text">
        {/* {" "} */}
        <strong>{username} </strong>
        {caption}
      </h1>
      {/* username + caption */}
    </div>
  );
}

export default Post;
