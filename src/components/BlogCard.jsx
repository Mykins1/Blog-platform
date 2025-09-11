import { useState, useEffect } from "react";
import {
  Heart,
  ChatCircleText,
  BookmarkSimple,
  Repeat,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.js";


const BlogCard = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const formatDate = (date) => {
  const d = new Date(date)
  console.log(d)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getUTCFullYear()}`;
};


const BlogItem = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [comments, setComments] = useState(blog.comments || 0);
  const [commented, setCommented] = useState(false)
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [reposts, setReposts] = useState(blog.reposts || 0);
  const [isReposted, setIsReposted] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const [maxWords, setMaxWords] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMaxWords(40); // More words for md and above
      } else {
        setMaxWords(17); // Default for small screens
      }
    };
    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  console.log(blog)
  const { themeClasses } = useTheme();
  

  return (
    <div className={`max-w-[350px] flex flex-col gap-2 ${themeClasses.background} ${themeClasses.text} rounded-2xl`}>
      {/* Author info */}
      <Link to={`/profile/${encodeURIComponent(blog.author)}`}>
        <div className="flex items-center gap-2 ">
          <img
            src={blog.authorImg}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <div className={`text-md font-medium `}>{blog.author}</div>
              {/* Use a fixed size for the dot */}
              <div
                className=""
                style={{
                  backgroundColor: "#6B7280",
                  borderRadius: "50%",
                  width: "3px",
                  height: "3px",
                  minWidth: "2px",
                  minHeight: "2px",
                }}
              ></div>
              <div className="text-sm font-normal ">
                {blog.date ? formatDate(blog.date) : "No date"}
              </div>
            </div>
            <div className={`text-xs font-normal italic ${themeClasses.span}`}>
              {blog.profession}
            </div>
          </div>
        </div>
      </Link>
      {/* <hr className="block md:hidden border-t border-gray-300 mt-2 " /> */}
      {/* Blog Content with Read More */}
      <p className="text-md font-medium leading-snug">
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
            className="text-sky-600 text-md font-medium ml-1 hover:underline inline-block whitespace-nowrap"
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
          className={` ${themeClasses.reaction} flex items-center gap-1 hover:text-blue-500 transition`}
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
          className={`${themeClasses.reaction} flex items-center gap-1 transition ${
            isReposted ? "text-sky-600" : " hover:text-sky-600"
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
          className={`${themeClasses.reaction} flex items-center gap-0.2 transition ${
            liked ? "text-red-500" : " hover:text-red-500"
          }`}
          onClick={handleLike}
        >
          <Heart size={20} weight={liked ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">{likes}</span>
        </button>

        {/* Save */}
        <button
          className={`${themeClasses.reaction} flex items-center gap-1 transition ${
            isSaved ? "text-yellow-500" : " hover:text-yellow-500"
          }`}
          onClick={handleSave}
        >
          <BookmarkSimple size={20} weight={isSaved ? "fill" : "regular"} />
        </button>
      </div>
      <hr className={`block md:hidden border-t ${themeClasses.border} w-screen -ml-3`} />{" "}
    </div>
  );
};

export default BlogCard;
