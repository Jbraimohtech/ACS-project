import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import "./Navbar.css";

const Navbar = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = headerRef.current?.offsetHeight || 80;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={headerRef}
        className={`novaNavbar ${isScrolled ? "novaNavbarContent-fixed" : ""}`}
      >

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