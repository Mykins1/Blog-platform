// Import necessary React Router hook for accessing URL parameters
import { useParams } from "react-router-dom";
// Import useState for managing component state
import { useState } from "react";
// Import icon components for delete action (Pencil removed)
import { Trash } from "phosphor-react";
// Import the blog database containing all posts
import blogData from "../../data/db.js";
// Import the page header component with back navigation
import Header from "../components/PageHeader.jsx";
// Import the theme context to access light/dark mode styles
import { useTheme } from "../context/ThemeContext.js";

/**
 * Profile Component - Displays a user's profile with their posts
 * Allows the current user to delete their own posts (Edit functionality removed)
 */
export default function Profile() {
  // Extract the author name from the URL parameters (e.g., /profile/John)
  const { author } = useParams();
  // Check if the currently viewing user is the logged-in user (allows deleting)
  const isCurrentUser = author === "Mykel Akinsade"; // Current logged-in user

  // Filter all blog posts to get only posts by this author
  const userPosts = blogData.blogs.filter((blog) => blog.author === author);

  // Get user info from the first post (if any), otherwise use default user object
  // This fallback ensures the profile page doesn't break if user has no posts
  const user = userPosts[0] || {
    author: author,
    authorImg: "https://randomuser.me/api/portraits/men/5.jpg",
    profession: "User",
  };

  // Access theme styles (colors, backgrounds) from the theme context
  const { themeClasses } = useTheme();

  // State to trigger component re-render after deletes
  const [refreshKey, setRefreshKey] = useState(0);

  // Redirect if no author is provided in the URL
  if (!author) {
    return <main className="p-8 text-center">User not found.</main>;
  }

  /**
   * handleDelete - Deletes a post after confirmation
   * Includes validation to ensure the user owns the post and it exists
   * @param {number} postId - The ID of the post to delete
   */
  const handleDelete = (postId) => {
    // Show confirmation dialog before deletion
    if (confirm("Are you sure you want to delete this post?")) {
      // Find the index of the post by its ID
      const postIndex = blogData.blogs.findIndex((p) => p.id === postId);

      // Verify the post exists (index should not be -1)
      if (postIndex === -1) {
        alert("Post not found.");
        return;
      }

      // Get the post object to verify ownership
      const post = blogData.blogs[postIndex];
      // Security check: only allow deletion if the post belongs to the current user
      if (post.author !== author) {
        alert("You can only delete your own posts.");
        return;
      }

      // Delete only this specific post from the array
      blogData.blogs.splice(postIndex, 1);

      // Force a component re-render to reflect the deletion
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <main>
      {/* Page header with title and back button */}
      <Header title="Profile" />

      {/* Centered content container */}
      <div className="flex flex-col items-center w-full">
        {/* User Profile Section and Posts Header Container */}
        <div className="flex items-start gap-8 leading-tight mb-8 mt-6 w-full max-w-[350px]">
          {/* User Profile Section - Displays user avatar, name, and profession */}
          <div className="flex items-center gap-4">
            {/* User avatar image */}
            <img
              src={user.authorImg}
              alt={user.author}
              className="w-24 h-24 rounded-full"
            />
            {/* User information (name and profession) */}
            <div className="flex flex-col text-left">
              {/* Username/Author name */}
              <h2 className={`text-xl font-semibold ${themeClasses.text}`}>
                {user.author}
              </h2>
              {/* User's profession/title */}
              <p className={`text-sm font-medium ${themeClasses.span}`}>
                {user.profession}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <section className="flex flex-col gap-4 items-center w-full">
          {/* Section header with "Posts" title and divider line */}
          <h3 className="flex flex-col gap-2 text-left text-lg font-bold w-full max-w-[350px]">
            Posts
            {/* Horizontal divider (visible only on mobile) */}
            <hr
              className={`block md:hidden border-t ${themeClasses.border} w-screen -ml-7`}
            />
          </h3>

          {/* Container for all user posts - using flex layout similar to BlogCard */}
          <div className={`flex flex-col items-center w-full gap-4 mb-5`}>
            {/* Show "No posts yet" message if user has no posts */}
            {userPosts.length === 0 ? (
              <div className={`text-center ${themeClasses.text}`}>
                No posts yet.
              </div>
            ) : (
              // Map through all user posts and render each one
              userPosts.map((post, index) => (
                <article
                  // Unique key combining post ID and refresh key for proper re-rendering
                  key={`${post.id}-${refreshKey}`}
                  className={`rounded-2xl px-4 md:px-0 py-3 ${themeClasses.background} max-w-[350px]`}
                >
                  {/* Post title and content display (Edit form removed) */}
                  <div>
                    {/* Post title */}
                    <h4 className={`font-semibold ${themeClasses.text}`}>
                      {post.title}
                    </h4>
                    {/* Post content/body */}
                    <p
                      className={`text-sm font-medium ${themeClasses.text} mb-2`}
                    >
                      {post.content}
                    </p>
                  </div>

                  {/* Display post image only if it exists and is not a placeholder */}
                  {post.img && !post.img.includes("placeholder") && (
                    <img
                      src={post.img}
                      className="w-full mb-3 h-40 object-cover rounded-lg"
                      alt={post.title}
                    />
                  )}

                  {/* Delete button - only show if current user is viewing their own profile */}
                  {/* Edit button removed */}
                  {isCurrentUser && (
                    <div className="flex gap-2 justify-end">
                      {/* Delete button - trash icon */}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className={`p-2 rounded ${themeClasses.hover} text-red-500`}
                        aria-label="Delete post"
                      >
                        <Trash size={18} weight="bold" />
                      </button>
                    </div>
                  )}

                  {/* Horizontal divider between posts (visible only on mobile, except for the last post) */}
                  {index < userPosts.length - 1 && (
                    <hr
                      className={`block md:hidden border-t ${themeClasses.border} w-auto`}
                    />
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
