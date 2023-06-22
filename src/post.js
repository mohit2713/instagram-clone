import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "./post.css";
import { db } from "./firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function Post({ postID, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    let unsubscibe;
    if (postID) {
      unsubscibe = db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscibe();
    };
  }, [postID]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postID).collection("comments").add({
      test: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

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
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {": "}
            {comment.test}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            className="post__button"
            type="submit"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
