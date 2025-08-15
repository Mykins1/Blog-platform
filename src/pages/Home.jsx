// import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard.jsx";
import blogData from "../../data/db.js";

export default function Blog() {
  // const [isPending, setIsPending] = useState(true);
  // const error = false;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsPending(false);
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div
      className=""
      // style={{ fontFamily: "Inter, sans-serif", background: "#fff" }}
    >
      {/* {isPending ? (
        <div className="flex items-center justify-center h-150">
          <div className="loading ">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-150">
          <div className="error">{error}</div>
        </div>
      ) : ( */}
        <div className="flex flex-col items-center max-w-4xl mx-auto w-full bg-white md:flex-col">
          {blogData && <BlogCard blogs={blogData.blogs} title="Blogs" />}
        </div>
      {/* )} */}
    </div>
  );
}
