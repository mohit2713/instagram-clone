import React from "react";
import img from "./images/testimg.webp";
import "./post.css";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";

function Post() {
  return (
    <div className="post">
      {/* <div>
        <Avatar
          alt="RemySharp"
          src="/static/images/avatar/1.jpg"
          classNam="post__avatar"
        />
      </div> */}

      {/* <div className="App">
        <br />
        <Button variant="contained" color="primary" size="large">
          GeeksforGeeks
        </Button>
      </div> */}

      <h1>hello user</h1>
      {/* header -> avtar +username */}
      <img src={img} alt="img" className="post__img" />
      {/* image */}
      <h1 className="post__text">
        {" "}
        <strong>Ben Tenyson </strong>How to Stay in the Moment: Take a Picture
      </h1>
      {/* username + caption */}
    </div>
  );
}

export default Post;
