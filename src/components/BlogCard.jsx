import { useState } from "react";
import { Heart, ChatCircleText, BookmarkSimple, Repeat } from "phosphor-react";
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

const BlogItem = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(blog.comments || 0);
  const [isCommented, setIsCommented] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [reposts, setReposts] = useState(blog.reposts || 0);
  const [isReposted, setIsReposted] = useState(false);

  const { themeClasses } = useTheme();

  // Handlers for interactions
  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    setIsCommented((prev) => !prev);
    setComments((prev) => (isCommented ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleRepost = () => {
    setIsReposted((prev) => !prev);
    setReposts((prev) => (isReposted ? prev - 1 : prev + 1));
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const words = blog.content.split(" ");
  const shouldTruncate = words.length > 20; // Simplified truncation logic

  return (
    <div
      className={`max-w-[350px] flex flex-col gap-2 ${themeClasses.background} ${themeClasses.text} rounded-2xl`}
    >
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

      <p className="text-md font-medium leading-snug">
        <span>
          {isExpanded || !shouldTruncate
            ? blog.content
            : `${words.slice(0, 20).join(" ")}`}
        </span>
        {shouldTruncate && (
          <button
            onClick={toggleReadMore}
            className="text-sky-600 text-md font-medium ml-1 inline-block hover:underline whitespace-nowrap"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>

      <div className="flex flex-col w-full">
        <img src={blog.img} alt="" className="rounded-lg w-full object-cover" />
      </div>

      <div className="flex items-center justify-around gap-1 w-full">
        <button
          className={`${themeClasses.reaction} flex items-center gap-1 hover:text-green-500 transition`}
          onClick={handleComment}
        >
          <ChatCircleText size={20} weight={isCommented ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">
            {comments}
          </span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-1 transition ${
            isReposted ? "text-sky-600" : " hover:text-sky-600"
          }`}
          onClick={handleRepost}
        >
          <Repeat size={20} weight={isReposted ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">
            {reposts}
          </span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-0.2 transition ${
            isLiked ? "text-red-500" : " hover:text-red-500"
          }`}
          onClick={handleLike}
        >
          <Heart size={20} weight={isLiked ? "fill" : "regular"} />
          <span className="text-sm w-6 text-center inline-block">{likes}</span>
        </button>

        <button
          className={`${
            themeClasses.reaction
          } flex items-center gap-1 transition ${
            isSaved ? "text-yellow-500" : " hover:text-yellow-500"
          }`}
          onClick={handleSave}
        >
          <BookmarkSimple size={20} weight={isSaved ? "fill" : "regular"} />
        </button>
      </div>

      <hr
        className={`block md:hidden border-t ${themeClasses.border} w-screen -ml-3`}
      />
    </div>
  );
};

export default BlogCard;
