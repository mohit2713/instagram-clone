import { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/iglogo.jpg";
import Post from "./post";
import { db, auth} from "./firebaseConfig";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  // const handleOpen = () => setOpen(true);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // useEffect -> Runs a piece of code based on a specified condtions

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      // every time a new post is added, this code fires..
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          posts: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
  };

  return (
    <div className="app">
      <div>
        <Button onClick={() => setOpen(true)}>Login</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <center>
              <img src={logo} alt="Ig-logo" className="app__headerImage" />
              <Box
                component="form" // no idea
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" }, // no idea
                }}
                noValidate // no idea
                autoComplete="off" // no idea
              >
                <TextField
                  id="outlined-basic"
                  value={username}
                  label="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  value={email}
                  label="e-mail"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  value={password}
                  label="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>
                  sign Up
                </Button>
              </Box>
            </center>
          </Box>
        </Modal>
      </div>

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="Instagram-logo" />
      </div>
      {/* <Post username="sachin" caption="hows the day" imageUrl="https://cdn.pixabay.com/photo/2018/04/26/12/14/travel-3351825_1280.jpg" />
      <Post username="Admin" caption="Good flowers" imageUrl="https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg"/>
      <Post username="testname4" caption="Awesome" imageUrl="https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg" />
      */}

      {posts.map(({ id, posts }) => (
        <Post
          key={id}
          username={posts.username}
          caption={posts.caption}
          imageUrl={posts.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
