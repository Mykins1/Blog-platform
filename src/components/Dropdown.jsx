
const UserDropdown = () => {
  return (
    <div className="absolute top-full right-0 left-0  w-full m-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="flex flex-col items-center py-2 ">
        <p className="w-full  px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
          Profile
        </p>
        <p className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
          Settings
        </p>
        <p className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
          Logout
        </p>
        {/* add more content here */}
      </div>
    </div>
  );
}
export default UserDropdown;