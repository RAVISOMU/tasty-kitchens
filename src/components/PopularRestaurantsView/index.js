import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const PopularRestaurantsView = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, cuisine, id, userRating} = restaurantDetails
  const {rating, totalReviews} = userRating
  return (
    <li className="restaurant-container" testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-item-link">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-ratings-container">
            <FaStar size="12px" color="#FFCC00" />
            <p className="restaurant-rating">{rating}</p>
            <p className="restaurant-total-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PopularRestaurantsView
