import { useState, useEffect } from "react";
import { MagnifyingGlass } from "phosphor-react";
import blogData from "../../data/db.js";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  useEffect(() => {
    if (!query) {
      setFilteredAuthors([]);
      return;
    }

    // Filter first
    const filtered = blogData.blogs.filter(
      (blog) =>
        (blog.author &&
          blog.author.toLowerCase().includes(query.toLowerCase())) ||
        (blog.profession &&
          blog.profession.toLowerCase().includes(query.toLowerCase()))
    );

    // Deduplicate by author
    const unique = [];
    const seen = new Set();

    filtered.forEach((blog) => {
      const authorKey = blog.author.trim().toLowerCase();
      if (!seen.has(authorKey)) {
        seen.add(authorKey);
        unique.push(blog);
      }
    });

    setFilteredAuthors(unique);
  }, [query]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          className="w-full border border-gray-400 bg-gray-50 p-2 pl-10 rounded-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Live search results */}
      <div className="flex flex-col gap-2">
        {query && filteredAuthors.length === 0 && (
          <div className="text-gray-400 text-sm px-2">No results found.</div>
        )}

        {filteredAuthors.map((blog) => (
          <Link
            key={blog.author} // safe to use author since it's unique now
            to={`/profile/${encodeURIComponent(blog.author)}`}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
          >
            <img
              src={blog.authorImg}
              alt={blog.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-md">{blog.author}</div>
              <div className="text-xs text-gray-500">{blog.profession}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
