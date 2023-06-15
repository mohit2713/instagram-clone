import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { storage, db } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function ImageUpload({ username }) {
  const [image, SetImage] = useState(null);
  const [caption, SetCaption] = useState("");
  const [progress, setProgess] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      SetImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {  // problemm //
    const UploadTask = storage.ref(`images/${image.name}`).put(image);  

    UploadTask.on(
      "state_changes",
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
              timestamp: firebase.firestore.FieldValue.serverTimesstamp(),
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
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a Caption..."
        onChange={(event) => SetCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Stack spacing={2} direction="row">
        {/* <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button> */}
        <Button variant="outlined" onClick={handleUpload}>
          Upload
        </Button>
      </Stack>
    </div>
  );
}

export default ImageUpload;
