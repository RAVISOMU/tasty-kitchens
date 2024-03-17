import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'

import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'FOUND',
  noCartItems: 'NOT_FOUND',
  paymentSuccess: 'PAYMENT_SUCCESS',
}

class Cart extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const parseCartData = JSON.parse(cartData)

    if (parseCartData === null || parseCartData.length === 0) {
      this.setState({cartStatus: cartStatusConstants.noCartItems})
    } else {
      const cartAmounts = []

      if (parseCartData.length > 0) {
        parseCartData.forEach(eachItem => {
          const totalItemAmount = eachItem.cost * eachItem.quantity
          cartAmounts.push(totalItemAmount)
        })
        const totalCartAmount = cartAmounts.reduce(
          (previousAmount, currentAmount) => previousAmount + currentAmount,
        )
        this.setState({totalCartAmount})
      }
      this.setState({
        cartData: parseCartData,
        cartStatus: cartStatusConstants.cartItemsFound,
      })
    }
  }

  onClickPlaceOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  onChangeTotalAmount = value => {
    this.setState(prev => ({totalCartAmount: prev.totalCartAmount + value}))
  }

  updateCartData = () => {
    const {cartData} = this.state
    console.log(cartData)
    if (cartData.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartData))
      this.setState({cartStatus: cartStatusConstants.cartItemsFound})
    } else {
      localStorage.removeItem('cartData')
    }
  }

  onDeleteCartItem = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState(
      {
        cartData: updatedCartData,
        cartStatus: cartStatusConstants.noCartItems,
      },
      this.updateCartData,
    )
  }

  cartEmptyView = () => (
    <>
      <div className="cart-empty-view-container">
        <div className="cart-empty-view-responsive-container">
          <img
            src="https://res.cloudinary.com/dqso6qusj/image/upload/v1710573723/gvrhqvqd6cdg0o9tinjy.jpg"
            className="cart-empty-image"
            alt="empty cart"
          />
          <h1 className="cart-empty-heading">No Order Yet!</h1>
          <p className="cart-empty-description">
            Your cart is empty. Add something from the menu.
          </p>

          <Link to="/">
            <button type="button" className="order-now-button">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </>
  )

  paymentSuccessfulView = () => (
    <>
      <div className="order-successful-container">
        <div className="order-successful-responsive-container">
          <img
            src="https://res.cloudinary.com/dqso6qusj/image/upload/v1710575882/xijeaw7nwmqq3nevnb2e.jpg"
            alt="check-circle"
          />
          <h1 className="order-successful-heading">Payment Successful</h1>
          <p className="order-successful-greeting">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <Link to="/">
            <button type="button" className="order-successful-button">
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
    </>
  )

  cartItemsView = () => {
    const {cartData, totalCartAmount} = this.state
    return (
      <>
        <div className="cart-list-container">
          <div className="cart-list-items-container">
            <div className="desktop-view-header">
              <h1 className="heading">Item</h1>
              <h1 className="quantity-heading">Quantity</h1>
              <h1 className="heading">Price</h1>
            </div>
            <ul className="cart-item-list-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachItem={eachItem}
                  onChangeTotalAmount={this.onChangeTotalAmount}
                  onDeleteCartItem={this.onDeleteCartItem}
                />
              ))}
            </ul>
            <hr />
            <div className="cart-total-amount-container">
              <h1 className="order-heading">Order Total:</h1>
              <div>
                <div className="total-amount-container">
                  <p testid="total-price" className="total-amount">
                    ₹ {totalCartAmount}.00
                  </p>
                </div>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.onClickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderCartPage = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCartPage()}
      </>
    )
  }
}

export default Cart
