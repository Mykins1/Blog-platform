import { useParams } from "react-router-dom";
import blogData from "../../data/db.js";

const Profile = () => {
  const { author } = useParams();
  const user = blogData.blogs.find((blog) => blog.author === author);

  // Get all posts by this user
  const userPosts = blogData.blogs.filter((blog) => blog.author === author);

  if (!user) {
    return <div className="p-8 text-center">User not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-col leading-tight mb-8">
        <img
          src={user.authorImg}
          alt={user.author}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold text-center">{user.author}</h2>
        <p className="text-center text-sm text-gray-600">{user.proffession}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="flex justify-start text-lg font-bold px-4 text-center">
          Posts
        </h3>
        <div className="flex flex-col">
          {userPosts.length === 0 ? (
            <div className="text-center text-gray-400">No posts yet.</div>
          ) : (
            userPosts.map((post) => (
              <div key={post.id} className=" rounded px-4 bg-white">
                <h4 className="font-semibold mt-2">{post.title}</h4>
                <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
