import { useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import blogData from "../../data/db.js";
const Blog = () => {
  const [isPending, setIsPending] = useState(true);
  const error = false;

  setTimeout(() => {
    setIsPending(false);
  }, 0);

  return (
    <div
      className=""
      // style={{ fontFamily: "Inter, sans-serif", background: "#fff" }}
    >
      {isPending ? (
        <div className="flex items-center justify-center h-150">
          <div className="loading ">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-150">
          <div className="error">{error}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center max-w-4xl mx-auto w-full bg-white">
          {blogData && <BlogCard blogs={blogData.blogs} title="Blogs" />}
        </div>
      )}
    </div>
  );
};

export default Blog;
