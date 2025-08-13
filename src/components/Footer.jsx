import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-5 mb-2 mt-auto bg-background">
      
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Socia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
