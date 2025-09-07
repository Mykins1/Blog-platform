import { useState, useEffect } from "react";
import { MagnifyingGlass } from "phosphor-react";
import blogData from "../../data/db.js";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Update URL when query changes
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  // Debouncing the query to avoid excessive re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay for debounce

    return () => clearTimeout(timer); // Cleanup the timer
  }, [query]);

  // Filter blogs based on the debounced query
  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredAuthors([]);
      return;
    }

    // Accumulating filtered blogs based on author or profession
    const filtered = blogData.blogs.reduce((acc, blog) => {
      // Ensure author and profession are available
      const authorKey = blog.author?.trim().toLowerCase();
      const professionKey = blog.profession?.trim().toLowerCase();

      // Check if either the author or profession matches the query
      if (
        !acc.some((item) => item.author.toLowerCase() === authorKey) && // Deduplication by author
        (authorKey?.includes(debouncedQuery.toLowerCase()) ||
          professionKey?.includes(debouncedQuery.toLowerCase()))
      ) {
        acc.push(blog); // Add blog to result if condition is met
      }

      return acc; // Return accumulated results
    }, []); // Initial value of accumulator is an empty array

    setFilteredAuthors(filtered); // Update the state with the filtered blogs
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search Input */}
      <div className="relative w-full">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          className="w-full border border-gray-400 bg-gray-50 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Search..."
          aria-label="Search authors and professions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Live Search Results */}
      <div className="flex flex-col gap-2">
        {query && filteredAuthors.length === 0 && (
          <div className="text-gray-400 text-sm px-2">No results found.</div>
        )}

        {/* Display filtered blogs */}
        {filteredAuthors.map((blog) => (
          <Link
            key={blog.id} // Assuming the blog has a unique 'id'
            to={`/profile/${encodeURIComponent(blog.author)}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition active:bg-gray-200"
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
