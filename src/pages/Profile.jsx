// Import necessary React Router hook for accessing URL parameters
import { useParams } from "react-router-dom";
// Import useState for managing component state
import { useState } from "react";
// Import icon components for edit and delete actions
import { Pencil, Trash } from "phosphor-react";
// Import the blog database containing all posts
import blogData from "../../data/db.js";
// Import the page header component with back navigation
import Header from "../components/PageHeader.jsx";
// Import the theme context to access light/dark mode styles
import { useTheme } from "../context/ThemeContext.js";

/**
 * Profile Component - Displays a user's profile with their posts
 * Allows the current user to edit and delete their own posts
 */
export default function Profile() {
  // Extract the author name from the URL parameters (e.g., /profile/John)
  const { author } = useParams();
  // Check if the currently viewing user is the logged-in user (allows editing)
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

  // State to track which post is currently being edited (by post ID)
  const [editingId, setEditingId] = useState(null);
  // State to store the title and content while editing
  const [editData, setEditData] = useState({ title: "", content: "" });
  // State to trigger component re-render after edits/deletes
  const [refreshKey, setRefreshKey] = useState(0);

  // Redirect if no author is provided in the URL
  if (!author) {
    return <main className="p-8 text-center">User not found.</main>;
  }

  /**
   * handleEdit - Prepares a post for editing by loading its data into state
   * @param {Object} post - The post object to edit
   */
  const handleEdit = (post) => {
    // Set the current post as the one being edited
    setEditingId(post.id);
    // Load the post's current title and content into the edit form
    setEditData({ title: post.title, content: post.content });
  };

  /**
   * handleSaveEdit - Updates a post with new title and content
   * @param {number} postId - The ID of the post to save
   */
  const handleSaveEdit = (postId) => {
    // Find the post in the blog data by its ID
    const post = blogData.blogs.find((p) => p.id === postId);
    // Only proceed if the post was found
    if (post) {
      // Update the post's title with the new value from the edit form
      post.title = editData.title;
      // Update the post's content with the new value from the edit form
      post.content = editData.content;
      // Exit edit mode by clearing the editingId
      setEditingId(null);
      // Force a component re-render to show the updated post
      setRefreshKey((prev) => prev + 1);
    }
  };

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

      {/* User Profile Section - Displays user avatar, name, and profession */}
      <div className="flex items-center gap-4 px-4 leading-tight mb-8 mt-6">
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

      {/* Posts Section */}
      <section className="flex flex-col gap-2">
        {/* Section header with "Posts" title and divider line */}
        <h3 className="flex flex-col gap-2 text-left text-lg font-bold px-4">
          Posts
          {/* Horizontal divider (visible only on mobile) */}
          <hr
            className={`block md:hidden border-t ${themeClasses.border} w-screen -ml-7`}
          />
        </h3>

        {/* Container for all user posts */}
        <div className={`flex flex-col ${themeClasses.background} gap-4 mb-5`}>
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
                className={`rounded px-4 py-3 ${themeClasses.background}`}
              >
                {/* Conditional rendering: Show edit form if this post is being edited */}
                {editingId === post.id ? (
                  <div className="flex flex-col gap-3">
                    {/* Edit form - Title input field */}
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className={`w-full p-2 border ${themeClasses.border} ${themeClasses.input} rounded outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Post title"
                    />
                    {/* Edit form - Content textarea field */}
                    <textarea
                      value={editData.content}
                      onChange={(e) =>
                        setEditData({ ...editData, content: e.target.value })
                      }
                      rows={4}
                      className={`w-full p-2 border ${themeClasses.border} ${themeClasses.input} rounded outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                      placeholder="Post content"
                    />
                    {/* Action buttons for save and cancel */}
                    <div className="flex gap-2">
                      {/* Save button - commits changes */}
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium text-sm"
                      >
                        Save
                      </button>
                      {/* Cancel button - exits edit mode without saving */}
                      <button
                        onClick={() => setEditingId(null)}
                        className={`flex-1 px-3 py-2 border ${themeClasses.border} rounded font-medium text-sm`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show post content if not in edit mode
                  <>
                    {/* Post title and content display */}
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
                        className="w-full mb-3 h-40 object-cover rounded"
                        alt={post.title}
                      />
                    )}

                    {/* Edit and Delete buttons - only show if current user is viewing their own profile */}
                    {isCurrentUser && (
                      <div className="flex gap-2 justify-end">
                        {/* Edit button - pencil icon */}
                        <button
                          onClick={() => handleEdit(post)}
                          className={`p-2 rounded ${themeClasses.hover} text-blue-500`}
                          aria-label="Edit post"
                        >
                          <Pencil size={18} weight="bold" />
                        </button>
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
                  </>
                )}

                {/* Horizontal divider between posts (visible only on mobile, except for the last post) */}
                {index < userPosts.length - 1 && (
                  <hr
                    className={`block md:hidden border-t ${themeClasses.border} w-full mx-auto`}
                  />
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
