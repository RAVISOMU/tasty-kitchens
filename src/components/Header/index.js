import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useState} from 'react'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const [options, setOptions] = useState(false)

  const onClickClose = () => {
    setOptions(prevOptions => !prevOptions)
  }

  const onClickMenu = () => {
    setOptions(prevOptions => !prevOptions)
  }

  const {history} = props
  const {location} = history
  const {pathname} = location
  const homeLinkColor =
    pathname === '/' || pathname !== '/cart' ? 'active-link' : 'navbar-link'
  const cartLinkColor = pathname === '/cart' ? 'active-link' : 'navbar-link'

  return (
    <>
      <div className="navbar-bg-container">
        <div className="nav-header">
          <div className="navbar-logo-container">
            <Link to="/" className="logo-link">
              <img
                src="https://res.cloudinary.com/dqso6qusj/image/upload/v1710571645/gwhqfssn7nhwuhgqtdrq.jpg"
                alt="website logo"
                className="navbar-logo"
              />

              <h1 className="navbar-logo-heading">Tasty Kitchens</h1>
            </Link>
          </div>

          <nav className="desktop-view-nav-bar">
            <ul className="nav-items">
              <li>
                <Link to="/" className={homeLinkColor}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className={cartLinkColor}>
                  Cart
                </Link>
              </li>

              <li className="navbar-link">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <button
            className="menu-options-button"
            aria-label="menu"
            type="button"
            onClick={onClickMenu}
          >
            <GiHamburgerMenu className="icon" />
          </button>
        </div>
      </div>
      <nav className="mobile-view-nav-bar">
        {options && (
          <div className="nav-items-hidden-view">
            <ul className="nav-items">
              <li>
                <Link to="/" className={homeLinkColor}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className={cartLinkColor}>
                  Cart
                </Link>
              </li>

              <li className="navbar-link">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              className="options-close-button"
              aria-label="close"
              type="button"
              onClick={onClickClose}
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </nav>
    </>
  )
}

export default withRouter(Header)
