import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dqso6qusj/image/upload/v1710573905/zvstgo0mzwgu3ooppk8i.jpg"
        alt="not found"
        className="not-found-image"
      />
      <div className="not-found-details-container">
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <Link to="/">
          <button type="button" className="homepage-button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
