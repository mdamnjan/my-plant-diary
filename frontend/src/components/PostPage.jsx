import axios from "axios";
import { useState, useEffect } from "react";

const PostPage = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios.get("/api/posts/").then((response) => setPostList(response.data));
  }, []);
  let posts = postList.map((post) => <div key={post.id}>{post.text}</div>);
  return <div>{posts}</div>;
};
export default PostPage;
