import { useState } from "react";
import { Image as ImageIcon, X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/PageHeader.jsx";
import { useTheme } from "../context/ThemeContext.js";
import blogData from "../../data/db.js";

export default function AddPost() {
  const navigate = useNavigate();
  const { themeClasses } = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    profession: localStorage.getItem("userProfession") || "Frontend Developer",
    img: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, img: reader.result }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image preview
  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, img: "" }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required.");
      return;
    }

    setIsSubmitting(true);

    // Save profession to localStorage for next time
    localStorage.setItem("userProfession", formData.profession);

    // Simulate a small delay for better UX
    setTimeout(() => {
      // Create new post object
      const newPost = {
        id: blogData.blogs.length + 1,
        title: formData.title,
        content: formData.content,
        profession: formData.profession,
        author: "Mykel Akinsade", // Replace with actual user if auth is implemented
        authorImg: "https://randomuser.me/api/portraits/men/5.jpg",
        img: formData.img || "",
        date: new Date().toISOString(),
        likes: 0,
        comments: 0,
        reposts: 0,
      };

      // Add to blogData
      blogData.blogs.unshift(newPost);

      setIsSubmitting(false);

      // Show success feedback and navigate
      alert("Post created successfully!");
      navigate("/");
    }, 500);
  };

  return (
    <main>
      <Header title="Create Post" />

      <section
        className={`max-w-2xl mx-auto md:px-6 py-5 ${themeClasses.background}`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-100 text-sm">
              {error}
            </div>
          )}

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className={`font-semibold ${themeClasses.text}`}
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="What's on your mind?"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={280}
              className={`w-full p-3 border ${themeClasses.border} ${themeClasses.input} rounded-lg outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${themeClasses.span}`}>
              {formData.title.length}/50
            </p>
          </div>

          {/* Content Textarea */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="content"
              className={`font-semibold ${themeClasses.text}`}
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your post here..."
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              className={`w-full p-3 border ${themeClasses.border} ${themeClasses.input} rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>

          {/* Profession/Tag Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="profession"
              className={`font-semibold ${themeClasses.text}`}
            >
              Profession/Tag
            </label>
            <input
              id="profession"
              name="profession"
              type="text"
              value={formData.profession}
              readOnly
              className={`w-full p-3 border ${themeClasses.border} ${themeClasses.input} rounded-lg outline-none opacity-75 cursor-not-allowed`}
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className={`font-semibold ${themeClasses.text}`}>
              Image
            </label>

            {!imagePreview ? (
              <label
                className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed ${themeClasses.border} rounded-lg cursor-pointer transition ${themeClasses.hover}`}
              >
                <ImageIcon size={32} className={themeClasses.icon} />
                <div className="text-center">
                  <p className={`font-semibold ${themeClasses.text}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-xs ${themeClasses.span}`}>
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                  aria-label="Remove image"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`flex-1 px-4 py-2 border ${themeClasses.border} rounded-full font-medium transition ${themeClasses.hover}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white rounded-full font-medium transition"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
