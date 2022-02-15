import PostCard from "../posts/PostCard";
import NewPost from "../posts/NewPost";
import { useSelector } from "react-redux";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div>
      <NewPost />
      <h1 className="text-xl md:text-3xl font-bold w-4/5 md:w-1/2 mx-auto">
        Posts
      </h1>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default Home;
