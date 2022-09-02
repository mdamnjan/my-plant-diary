import "./Post.css";

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="user-profile">
        <img href="" />
        <p className="username">{post.owner.username}</p>
      </div>
      <p>Plant: {post.plant.name}</p>
      <p>{post.text}</p>
    </div>
  );
};
export default Post;
