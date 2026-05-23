
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const MobileScreenNav = () => {

    const navRef = useRef<HTMLElement | null>(null);
    const logoRef = useRef<HTMLHeadingElement | null>(null);

    const showPhoneNavBar = () => {

        // SHOW NAV
        if (navRef.current) {
            navRef.current.classList.toggle("responsive-nav");
        }

        // CHANGE LOGO COLOR
        if (logoRef.current) {
            logoRef.current.classList.toggle("white-logo");
        }

    }

    return (

        <header>

            {/* LOGO */}
            <h3
                ref={logoRef}
                className='logo'
            >
                LOGO
            </h3>

            {/* NAV */}
            <nav
                ref={navRef}
                className="menu-links"
            >
                <div className='sold-nav'>
                    <Link to='/' className='phone-menu-link'>
                        Home
                    </Link>

                    <Link to='/events' className='phone-menu-link'>
                        Events
                    </Link>

                    <Link to='/blog' className='phone-menu-link'>
                        Blog
                    </Link>

                    <Link to='/resources' className='phone-menu-link'>
                        Resources
                    </Link>

                    <Link to='/members' className='phone-menu-link'>
                        Members
                    </Link>

                    <Link to='/giving' className='phone-menu-link'>
                        Giving
                    </Link>
                </div>

                <div className='access-box'>
                    <Link to='/login' className='login-btn'>Login</Link>
                    <Link to='/register' className='signup-btn'>Register</Link>
                </div>

                

                <button
                    className='phone-nav-btn nav-close-btn'
                    onClick={showPhoneNavBar}
                >
                    <FaTimes />
                </button>

            </nav>

            

            {/* OPEN BUTTON */}
            <button
                className='phone-nav-btn'
                onClick={showPhoneNavBar}
            >
                <FaBars />
            </button>

        </header>
    )
}

export default MobileScreenNav