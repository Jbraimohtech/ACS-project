import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 80;
      setIsScrolled(window.scrollY > threshold);
    };

    const handleResize = () => {
      setAboutDropdownOpen(false);
    };

    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("resize", handleResize);

    const shouldLockScroll = menuOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
    document.documentElement.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [aboutDropdownOpen]);

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
          <div className="novaLogoIcon"></div>
        </Link>

        <nav className="novaNavLinks">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/blog">Blog</Link>
          <div
            className="novaNavDropdown"
            ref={dropdownRef}
            onMouseEnter={() => {
              if (window.innerWidth > 768) setAboutDropdownOpen(true);
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 768) setAboutDropdownOpen(false);
            }}
          >
            <button
                type="button"
                className={`novaNavDropdownToggle ${
                    aboutDropdownOpen ? "active" : ""
                }`}
                onClick={() =>
                    setAboutDropdownOpen(!aboutDropdownOpen)
                }
            >
                About Us

                <ChevronDown
                    size={16}
                    className={`dropdownChevron ${
                        aboutDropdownOpen ? "rotate" : ""
                    }`}
                />
            </button>
            <div className={`novaNavDropdownMenu ${aboutDropdownOpen ? "open" : ""}`}>
              <Link
                  to="/about-us"
                  onClick={() => setAboutDropdownOpen(false)}
              >
                  <strong>About ACC</strong>
              </Link>

                <Link
                  to="/our-mission"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <strong>Our Mission</strong>
                </Link>

                <Link
                  to="/become-member"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <strong>Become a Member</strong>
                </Link>

                <Link
                  to="/leaders"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <strong>ACC Leaders</strong>
                </Link>

                <Link
                to="/ranking-structure"
                onClick={() => setAboutDropdownOpen(false)}
              >
                <strong>Ranking Structure</strong> 
              </Link>
            </div>
          </div>
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
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
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
            <div className="novaMobileLogoIcon"></div>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
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

          <div className="novaMobileSubMenu">

            <button
              className="novaMobileSubMenuButton"
              onClick={() => setMobileAboutOpen((open) => !open)}
              aria-expanded={mobileAboutOpen}
              aria-controls="mobile-about-links"
            >
              <span>About Us</span>

              <ChevronDown
                size={20}
                className={`dropdownChevron ${
                  mobileAboutOpen ? "rotate" : ""
                }`}
              />
            </button>

            <div
              id="mobile-about-links"
              className={`novaMobileSubMenuItems ${
                mobileAboutOpen ? "open" : ""
              }`}
            >
              <Link
                to="/about-us"
                onClick={() => {
                  setMenuOpen(false);
                  setMobileAboutOpen(false);
                }}
              >
                About ACC
              </Link>

              <Link
                to="/our-mission"
                onClick={() => {
                  setMenuOpen(false);
                  setMobileAboutOpen(false);
                }}
              >
                Our Mission
              </Link>

              <Link
                to="/become-member"
                onClick={() => {
                  setMenuOpen(false);
                  setMobileAboutOpen(false);
                }}
              >
                Become a Member
              </Link>

              <Link
                to="/leaders"
                onClick={() => {
                  setMenuOpen(false);
                  setMobileAboutOpen(false);
                }}
              >
                ACC Leaders
              </Link>

              <Link
                to="/ranking-structure"
                onClick={() => {
                  setMenuOpen(false);
                  setMobileAboutOpen(false);
                }}
              >
                Ranking Structure
              </Link>

            </div>

          </div>

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