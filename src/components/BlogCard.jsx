import { useState } from "react";
import { format } from "date-fns";
import {
  Heart,
  ChatCircleText,
  BookmarkSimple,
  Repeat,
} from "phosphor-react";

const BlogCard = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const BlogItem = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [comments, setComments] = useState(blog.comments || 0);
  const [commented, setCommented] = useState(false)
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Add repost state
  const [reposts, setReposts] = useState(blog.reposts || 0);
  const [isReposted, setIsReposted] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const maxWords = 17;
  const words = blog.content.split(" ");
  const truncated =
    words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + ""
      : blog.content;

  // Like button handler
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  //comments handler
  const handleComment = () =>{
    if (commented) {
      setComments(comments-1)
    } else {
      setComments( comments + 1)
    }
    setCommented(!commented)
  }
  // Save button handler
  const handleSave = () => {
    if (isSaved) {
      setSaved(saved);
    } else {
      setSaved();
    }
    setIsSaved(!isSaved);
  };

  // Repost button handler
  const handleRepost = () => {
    if (isReposted) {
      setReposts(reposts - 1);
    } else {
      setReposts(reposts + 1);
    }
    setIsReposted(!isReposted);
  };

  return (
    <div className="max-w-[350px] flex flex-col gap-2">
      {/* Author info */}
      <div className="flex items-center gap-2 ">
        <img
          src={blog.authorImg}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="leading-tight">
          <div className="flex items-center gap-1">
            <div className="text-md font-medium  ">{blog.author}</div>
            {/* Use a fixed size for the dot */}
            <div
              className="dot bg-gray-500 rounded-full"
              style={{
                width: "3px",
                height: "3px",
                minWidth: "2px",
                minHeight: "2px",
              }}
            ></div>
            <div className="text-sm text-gray-700">
              {" "}
              {blog.date
                ? format(new Date(blog.date), "MMMM dd, yyyy")
                : "No date"}
            </div>
          </div>
          <div className="text-sm text-gray-700 italic">{blog.proffession}</div>
        </div>
      </div>
      {/* <hr className="block md:hidden border-t border-gray-300 mt-2 " /> */}
      {/* Blog Content with Read More */}
      <p className="text-md  leading-tight">
        <span
          className={`${
            !isExpanded ? "truncate whitespace-pre-wrap align-bottom" : ""
          }`}
        >
          {isExpanded ? blog.content : truncated}
        </span>{" "}
        {words.length > maxWords && (
          <button
            onClick={toggleReadMore}
            className="text-blue-500 text-md font-normal ml-1 hover:underline inline-block whitespace-nowrap"
          >
            {isExpanded ? "" : "Show more"}
          </button>
        )}
      </p>
      {/* Blog Image*/}
      <div className="flex flex-col w-full">
        <img
          src={blog.img}
          alt=""
          className="rounded-2xl w-full object-cover"
        />
      </div>
      {/* Like and Comment Icons */}
      <div className="flex items-center justify-around gap-1 w-full">
        {/* Comment */}
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
          onSave={handleComment}
        >
          <ChatCircleText
            size={20}
            weight={commented ? "text-blue-500" : "regular"}
          />
          <span className="text-sm w-6 text-center inline-block">
            {comments}
          </span>
        </button>

        {/* Repost */}
        <button
          className={`flex items-center gap-1 transition ${
            isReposted ? "text-green-600" : "text-gray-500 hover:text-green-600"
          }`}
          onClick={handleRepost}
        >
          <Repeat size={20} weight={isReposted ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">
            {reposts}
          </span>
        </button>
        
        {/* Like */}
        <button
          className={`flex items-center gap-0.2 transition ${
            liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
          onClick={handleLike}
        >
          <Heart size={20} weight={liked ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">{likes}</span>
        </button>

        {/* Save */}
        <button
          className={`flex items-center gap-1 transition ${
            isSaved ? "text-yellow-500" : "text-gray-500 hover:text-yellow-500"
          }`}
          onClick={handleSave}
        >
          <BookmarkSimple size={20} weight={isSaved ? "fill" : "regular"} />
        </button>
      </div>
      <hr className="block md:hidden border-t border-gray-300  w-screen -ml-3" />{" "}
    </div>
  );
};

export default BlogCard;
