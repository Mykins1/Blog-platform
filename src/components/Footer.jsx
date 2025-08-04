
const Footer = () => {
    return (
      <footer className="flex flex-col items-center justify-between gap-5 mb-2">
        <div className=" flex justify-evenly w-full text-gray-700 ">
          {/* <a
            href="/blogs"
            className="hover:underline hover:text-black cursor-pointer"
          >
            Home
          </a>
          <a className="hover:underline hover:text-black cursor-pointer">
            Categories
          </a> */}
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Say it. All rights reserved.
          </p>
        </div>
      </footer>
    );
}
 
export default Footer;