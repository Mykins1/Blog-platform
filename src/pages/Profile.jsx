import { useParams } from "react-router-dom";
import blogData from "../../data/db.js";
import Header from "../components/PageHeader.jsx";
import { useTheme } from "../context/ThemeContext.js";

export default function Profile() {
  const { author } = useParams();
  const user = blogData.blogs.find((blog) => blog.author === author);

  // Get all posts by this user
  const userPosts = blogData.blogs.filter((blog) => blog.author === author);

  const { themeClasses } = useTheme();

  if (!user) {
    return <main className="p-8 text-center">User not found.</main>;
  }

  return (
    <main>
      <Header title="Profile" />
      <div className="flex items-center gap-4 px-4 leading-tight mb-8 mt-6">
        <img
          src={user.authorImg}
          alt={user.author}
          className="w-24 h-24 rounded-full"
        />
        <div className="flex flex-col text-left">
          <h2 className={`text-xl font-semibold ${themeClasses.text}`}>
            {user.author}
          </h2>
          <p className={`text-sm font-medium ${themeClasses.span}`}>
            {user.profession}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <h3 className="flex flex-col gap-2 text-left text-lg font-bold px-4">
          Posts
          <hr
            className={`block md:hidden border-t ${themeClasses.border} w-screen -ml-7`}
          />
        </h3>
        <div className={`flex flex-col ${themeClasses.background} gap-4 mb-5`}>
          {userPosts.length === 0 ? (
            <div className={`text-center ${themeClasses.text}`}>
              No posts yet.
            </div>
          ) : (
            userPosts.map((post, index) => (
              <article
                key={post.id}
                className={`rounded px-4 ${themeClasses.background}`}
              >
                <h4 className={`font-semibold mt-2 ${themeClasses.text}`}>
                  {post.title}
                </h4>
                <p className={`text-sm font-medium ${themeClasses.text} mb-2`}>
                  {post.content}
                </p>
                <img
                  src={post.img}
                  className="w-full mb-2 h-40 object-cover rounded"
                />
                {index < userPosts.length - 1 && (
                  <hr className="block md:hidden border-t border-gray-300 w-full mx-auto" />
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
