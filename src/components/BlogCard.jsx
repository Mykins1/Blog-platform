import { useState, useMemo } from "react";
import { Heart, ChatCircleText, BookmarkSimple, Repeat } from "phosphor-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.js";

const formatDate = (date) => {
  const d = new Date(date);
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

// Main BlogItem component
const BlogItem = ({ blog }) => {
  const words = blog.content.split(" ");
  const shouldTruncate = words.length > 20;

  // Use useMemo to cache the truncated content and avoid re-calculating on every render
  const truncatedContent = useMemo(() => {
    return shouldTruncate ? `${words.slice(0, 20).join(" ")}` : blog.content;
  }, [blog.content, shouldTruncate, words]);

  // Interaction state using a single useState hook for cleaner state management
  const [interactionState, setInteractionState] = useState({
    isExpanded: false,
    likes: blog.likes || 0,
    isLiked: false,
    comments: blog.comments || 0,
    isCommented: false,
    isSaved: false,
    reposts: blog.reposts || 0,
    isReposted: false,
  });

  const { themeClasses } = useTheme();

  // Unified interaction handler
  const handleInteraction = (type) => {
    setInteractionState((prevState) => {
      let newState = { ...prevState };
      switch (type) {
        case "like":
          newState.isLiked = !prevState.isLiked;
          newState.likes += newState.isLiked ? 1 : -1;
          break;
        case "comment":
          newState.isCommented = !prevState.isCommented;
          newState.comments += newState.isCommented ? 1 : -1;
          break;
        case "save":
          newState.isSaved = !prevState.isSaved;
          break;
        case "repost":
          newState.isReposted = !prevState.isReposted;
          newState.reposts += newState.isReposted ? 1 : -1;
          break;
        case "toggleExpand":
          newState.isExpanded = !prevState.isExpanded;
          break;
        default:
          break;
      }
      return newState;
    });
  };

  return (
    <div
      className={`max-w-[350px] flex flex-col gap-2 ${themeClasses.background} ${themeClasses.text} rounded-2xl`}
    >
      {/* Blog Author and Date */}
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

      {/* Blog Content with Read More/Show Less */}
      <p className="text-md font-medium leading-snug">
        <span>
          {interactionState.isExpanded ? blog.content : truncatedContent}
        </span>
        {shouldTruncate && (
          <button
            onClick={() => handleInteraction("toggleExpand")}
            className="text-sky-600 text-md font-medium ml-1 inline-block hover:underline whitespace-nowrap"
          >
            {interactionState.isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>

      {/* Blog Image */}
      <div className="flex flex-col w-full">
        <img src={blog.img} alt="" className="rounded-lg w-full object-cover" />
      </div>

      {/* Interactive Buttons */}
      <div className="flex items-center justify-around gap-1 w-full">
        <button
          className={`${themeClasses.reaction} flex items-center gap-1 hover:text-green-500 transition`}
          onClick={() => handleInteraction("comment")}
        >
          <ChatCircleText
            size={20}
            weight={interactionState.isCommented ? "fill" : "regular"}
          />
          <span className="text-sm w-6 text-center inline-block">
            {interactionState.comments}
          </span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-1 transition ${
            interactionState.isReposted ? "text-sky-600" : " hover:text-sky-600"
          }`}
          onClick={() => handleInteraction("repost")}
        >
          <Repeat
            size={20}
            weight={interactionState.isReposted ? "fill" : "regular"}
          />
          <span className="text-sm w-6 text-center inline-block">
            {interactionState.reposts}
          </span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-0.2 transition ${
            interactionState.isLiked ? "text-red-500" : " hover:text-red-500"
          }`}
          onClick={() => handleInteraction("like")}
        >
          <Heart
            size={20}
            weight={interactionState.isLiked ? "fill" : "regular"}
          />
          <span className="text-sm w-6 text-center inline-block">
            {interactionState.likes}
          </span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-1 transition ${
            interactionState.isSaved
              ? "text-yellow-500"
              : " hover:text-yellow-500"
          }`}
          onClick={() => handleInteraction("save")}
        >
          <BookmarkSimple
            size={20}
            weight={interactionState.isSaved ? "fill" : "regular"}
          />
        </button>
      </div>

      <hr
        className={`block md:hidden border-t ${themeClasses.border}  w-auto `}
      />
    </div>
  );
};

// Wrapper component to render a list of blog posts
export default function BlogCard({ blogs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
