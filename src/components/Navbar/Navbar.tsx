import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="novaNavbar">

        <Link
          to="/"
          className="novaLogo"
        >
          LOGO
        </Link>

        <nav className="novaNavLinks">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/members">Members</Link>
          <Link to="/giving">Giving</Link>
        </nav>

        <div className="novaAuthButtons">
          <Link
            to="/login"
            className="novaLoginBtn"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="novaRegisterBtn"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="novaMenuButton"
          onClick={() =>
            setMenuOpen(true)
          }
        >
          <Menu size={28} />
        </button>

      </header>

      {/* Mobile Drawer */}
      <div
        className={`novaMobileMenu ${
          menuOpen
            ? "novaMobileMenuOpen"
            : ""
        }`}
      >

        <div className="novaMobileHeader">

          <Link
            to="/"
            className="novaMobileLogo"
          >
            LOGO
          </Link>

          <button
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <X size={28} />
          </button>

        </div>

        <nav className="novaMobileLinks">

          <Link to="/">Home</Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/blog">
            Blog
          </Link>

          <Link to="/members">
            Members
          </Link>

          <Link to="/giving">
            Giving
          </Link>

        </nav>

        <div className="novaMobileActions">

          <Link
            to="/login"
            className="novaMobileLogin"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="novaMobileRegister"
          >
            Register
          </Link>

        </div>

      </div>
    </>
  );
};

export default Navbar;