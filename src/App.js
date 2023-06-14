import { useState } from "react";
import "./App.css";
import logo from "./images/iglogo.jpg";
import Post from "./post";
function App() {
  const [posts, setPosts] = useState([
    {
      username: "mohit",
      caption: "A fun Project",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg",
    },
    {
      username: "sachin002",
      caption: "awesome",
      imageUrl:
        "https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg",
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="Instagram-logo" />
      </div>
      {/* <Post username="sachin" caption="hows the day" imageUrl="https://cdn.pixabay.com/photo/2018/04/26/12/14/travel-3351825_1280.jpg" />
      <Post username="Admin" caption="Good flowers" imageUrl="https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg"/>
      <Post username="testname4" caption="Awesome" imageUrl="https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg" />
      */}

      {posts.map((posts) => (
        <Post
          username={posts.username}
          caption={posts.caption}
          imageUrl={posts.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
