import { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/iglogo.jpg";
import notlogin from "./images/not_login.png";

import Post from "./post";
import { db, auth } from "./firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUpload from "./ImageUpload";
// import InstagramEmbed from "react-instagram-embed";

function App() {
  // const handleOpen = () => setOpen(true);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

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
    const unsubscibe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in..
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has log out..
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscibe();
    };
  }, [user, username]);

  useEffect(() => {
    // this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <div>
        {/* <Button onClick={() => setOpen(true)}>signUp</Button> */}

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
                <Button
                  style={{ color: "black" }}
                  type="submit"
                  onClick={signUp}
                >
                  sign Up
                </Button>
              </Box>
            </center>
          </Box>
        </Modal>
      </div>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
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
              <Button   variant="outlined" type="submit" onClick={signIn}>
                sign In
              </Button>
            </Box>
          </center>
        </Box>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="Instagram-logo" />
        {user ? (
          <Button
            variant="outlined"
            type="submit"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        ) : (
          <div>
            <Button
              // variant="outlined"
              type="submit"
              disableElevation
              onClick={() => setOpenSignIn(true)}
            >
              sign In
            </Button>
            <Button
              // variant="outlined"
              type="submit"
              disableElevation
              onClick={() => setOpen(true)}
            >
              sign Up
            </Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {posts.map(({ id, posts }) => (
          <Post
            key={id}
            postID={id}
            user={user}
            username={posts.username}
            caption={posts.caption}
            imageUrl={posts.imageUrl}
          />
        ))}
      </div>

      {/* <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        clientAccessToken="123|456"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <div className="not_login">
          <h3 className="not_login_text">Sorry you need to login to upload</h3>
          <img src={notlogin} alt="not_login_img" className="not_login_img" />
        </div>
      )}
    </div>
  );
}

export default App;
