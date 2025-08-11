import { useState, useEffect } from "react";
import { MagnifyingGlass } from "phosphor-react";
import blogData from "../../data/db.js";
import { Link } from "react-router";


const SearchPage = ({blog}) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }
    setFiltered(
      blogData.blogs.filter(
        (blog) =>
          (blog.author &&
            blog.author.toLowerCase().includes(query.toLowerCase())) ||
          (blog.profession &&
            blog.profession.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [query]);

  return (
    <div
      className="flex flex-col gap-4 w-full"
      style={{
        fontFamily: {
          "system-ui": [
            '"Segoe UI"',
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ],
        },
      }}
    >
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
        {query && filtered.length === 0 && (
          <div className="text-gray-400 text-sm px-2">No results found.</div>
        )}
        <Link to={`/profile/${encodeURIComponent(blog.author)}`}>
          {filtered.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
            >
              <img
                src={blog.authorImg}
                alt={blog.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-md">{blog.author}</div>
              </div>
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
};

export default SearchPage;
