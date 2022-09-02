import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import "./Post.css"
import { Divider } from "@mui/material";

const postList = [
  {
    id: 1,
    text: "I love this plant so much!",
    plant: { id: 1, name: "String of Hearts" },
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
  },
  {
    id: 2,
    text: "Why is this plant so dramatic ;(",
    plant: { id: 1, name: "Calathea Orbifolia" },
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
  },
];

const PostPage = () => {
  // const [postList, setPostList] = useState([]);
  // useEffect(() => {
  //   axios.get("/api/posts/").then((response) => setPostList(response.data));
  // }, []);
  let posts = postList.map((post) => <><Post key={post.id} post={post} /><Divider/></>);
  return <div className="post-list">{posts}</div>;
};
export default PostPage;
