import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  state = {}

  componentDidMount() {
    const {eachItem} = this.props
    const {cost, quantity} = eachItem
    const totalItemCost = cost * quantity
    this.setState({totalItemCost, quantity})
  }

  updateLocalStorage = () => {
    const {quantity} = this.state
    const {eachItem} = this.props
    const {imageUrl, name, cost, id} = eachItem

    const localCartData = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(localCartData)
    const updatedCartData = parsedCartData
    const cartItem = {id, name, cost, imageUrl, quantity}
    const updatedCart = updatedCartData.filter(item => item.id !== id)
    updatedCart.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
  }

  onDecrementClicked = () => {
    const {onChangeTotalAmount, eachItem, onDeleteCartItem} = this.props
    const {cost, id} = eachItem
    const {quantity} = this.state
    if (quantity > 1) {
      onChangeTotalAmount(-cost)
      this.setState(
        prev => ({
          quantity: prev.quantity - 1,
          totalItemCost: prev.totalItemCost - cost,
        }),
        this.updateLocalStorage,
      )
    } else {
      onChangeTotalAmount(-cost)
      onDeleteCartItem(id)
    }
  }

  onIncrementClicked = () => {
    const {onChangeTotalAmount, eachItem} = this.props
    const {cost} = eachItem
    onChangeTotalAmount(cost)
    this.setState(
      prev => ({
        quantity: prev.quantity + 1,
        totalItemCost: prev.totalItemCost + cost,
      }),
      this.updateLocalStorage,
    )
  }

  render() {
    const {eachItem} = this.props
    const {imageUrl, name} = eachItem
    const {totalItemCost, quantity} = this.state
    return (
      <>
        <li testid="cartItem" className="cart-item-container">
          <img className="cart-item-image" src={imageUrl} alt={imageUrl} />
          <div className="cart-item-details-container">
            <h1 className="cart-item-name">{name}</h1>
            <div className="cart-item-quantity-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="quantity-button"
                onClick={this.onDecrementClicked}
                aria-label="minus"
              >
                <BsDashSquare />
              </button>
              <p testid="item-quantity" className="cart-item-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                className="quantity-button"
                onClick={this.onIncrementClicked}
                aria-label="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <p className="cart-item-cost">₹ {totalItemCost}.00</p>
          </div>
        </li>
      </>
    )
  }
}

export default CartItem
