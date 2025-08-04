// import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import Messages from "../components/messages";
import { Pen, Plus, SquarePen, User, Users } from "lucide-react";
import useFetch from "../components/Handling";
import UserDropdown from "../components/Dropdown";

const Blog = () => {
  const { data, isPending, error } = useFetch("http://localhost:4000/blogs");
  return (
    <div
      className=""
      style={{ fontFamily: "Inter, sans-serif", background: "#fff" }}
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
          
          {data && <BlogCard blogs={data} title="Blogs" />}
        </div>
      )}
    </div>
  );
};

export default Blog;
