import { useParams } from "react-router-dom";
import blogData from "../../data/db.js";

const Profile = () => {
  const { author } = useParams();
  const user = blogData.blogs.find((blog) => blog.author === author);

  if (!user) {
    return <div className="p-8 text-center">User not found.</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col leading-tight">
        <img
          src={user.authorImg}
          alt={user.author}
          className="w-24 h-24 rounded-full mx-auto "
        />
        <div>
          <h2 className="text-xl font-semibold text-center">{user.author}</h2>
        </div>
        <div>
          <p className="text-center text-sm text-gray-600">
            {user.proffession}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
