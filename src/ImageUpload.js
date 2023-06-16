import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { storage, db } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, SetImage] = useState(null);
  const [caption, SetCaption] = useState("");
  const [progress, setProgess] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      SetImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // problemm //
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progess function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgess(progress);
      },
      (error) => {
        // error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgess(0);
            SetCaption("");
            SetImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {/* <h2 style={{ textAlign: "center", margin: "15px" }}>Add New post</h2> */}
      <progress className="imageupload__progress" value={progress} max="100" />

      <input type="file" onChange={handleChange} />
      <div className="caption">
        <input
          type="text"
          placeholder="Enter a Caption..."
          onChange={(event) => SetCaption(event.target.value)}
          value={caption}
        />
      </div>

      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleUpload}>
          ADD POST
        </Button>
      </Stack>
    </div>
  );
}

export default ImageUpload;
