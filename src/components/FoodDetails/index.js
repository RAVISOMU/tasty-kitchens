import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import './index.css'

class FoodDetails extends Component {
  state = {}

  componentDidMount() {
    const {eachFoodItem} = this.props
    const {id} = eachFoodItem
    const cartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(cartData)
    if (parsedCartData === null) {
      this.setState({
        isButtonClicked: false,
        itemQuantity: 0,
      })
    } else {
      const currentCartData = parsedCartData.filter(
        eachItem => eachItem.id === id,
      )
      if (currentCartData.length > 0) {
        this.setState({
          isButtonClicked: true,
          itemQuantity: currentCartData[0].quantity,
        })
      }
    }
  }

  updateLocalStorage = () => {
    const {isButtonClicked, itemQuantity} = this.state
    const {eachFoodItem} = this.props
    const {imageUrl, name, cost, id} = eachFoodItem
    const localCartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(localCartData)

    if (parsedCartData === null) {
      const updatedParsedCartData = []

      if (isButtonClicked === true && itemQuantity > 0) {
        const cartItem = {id, name, cost, imageUrl, quantity: itemQuantity}
        updatedParsedCartData.push(cartItem)
        localStorage.setItem('cartData', JSON.stringify(updatedParsedCartData))
      }
    } else {
      const updatedCartData = parsedCartData
      if (isButtonClicked === true) {
        const cartItem = {id, name, cost, imageUrl, quantity: itemQuantity}
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        updatedCart.push(cartItem)
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      } else {
        const updatedCart = updatedCartData.filter(
          eachItem => eachItem.id !== id,
        )
        localStorage.setItem('cartData', JSON.stringify(updatedCart))
      }
    }
  }

  onClickedAddCart = () => {
    this.setState(
      {
        isButtonClicked: true,
        itemQuantity: 1,
      },
      this.updateLocalStorage,
    )
  }

  decrementCartItemQuantity = () => {
    const {itemQuantity} = this.state
    if (itemQuantity === 1) {
      this.setState(
        {
          itemQuantity: 0,
          isButtonClicked: false,
        },
        this.updateLocalStorage,
      )
    } else {
      this.setState(
        prev => ({
          itemQuantity: prev.itemQuantity - 1,
          isButtonClicked: true,
        }),
        this.updateLocalStorage,
      )
    }
  }

  incrementCartItemQuantity = () => {
    const {itemQuantity} = this.state
    const updatedItemQuantity = itemQuantity + 1
    this.setState({itemQuantity: updatedItemQuantity}, this.updateLocalStorage)
  }

  render() {
    const {eachFoodItem} = this.props
    const {isButtonClicked, itemQuantity} = this.state

    return (
      <li className="food-details-container" testid="foodItem">
        <img
          src={eachFoodItem.imageUrl}
          alt="food-item"
          className="food-image"
        />
        <div className="food-details">
          <h1 className="food-name">{eachFoodItem.name}</h1>
          <div className="food-cost-container">
            <p className="food-cost">₹{eachFoodItem.cost}.00</p>
          </div>
          <div className="food-rating-container">
            <FaStar size="12px" color="#FFCC00" />
            <p className="food-rating-count">{eachFoodItem.rating}</p>
          </div>
          {isButtonClicked && itemQuantity > 0 ? (
            <div className="each-item-add-counter-container">
              <button
                type="button"
                className="food-quantity-buttons"
                testid="decrement-count"
                onClick={this.decrementCartItemQuantity}
              >
                -
              </button>
              <p className="food-item-quantity" testid="active-count">
                {itemQuantity}
              </p>
              <button
                type="button"
                className="food-quantity-buttons"
                testid="increment-count"
                onClick={this.incrementCartItemQuantity}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-add-button"
              onClick={this.onClickedAddCart}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodDetails
