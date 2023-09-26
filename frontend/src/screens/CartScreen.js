import React, {useEffect} from 'react'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelect, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form,Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom';

function CartScreen() {
  let { id } = useParams()
  
  const params = new URLSearchParams(useLocation().search)
  const qty = params ? params.get('qty') : 1

  console.log('productId:', id)

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const navigate = useNavigate()

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h1> Shoping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            You cart is empty <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}> {item.name} </Link>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={3}>
                  <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                    {
                      [...Array(item.countInStock).keys()].map((x)=>
                      (
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      ))
                    }
                  </Form.Control>
                </Col>
                <Col md={1}>
                  <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Subtotal {cartItems.reduce((acc, item) => +acc + +item.qty, 0)} items</h2>
              ${cartItems.reduce((acc, item) => +acc + +item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-grid gap-2">
              <Button 
                type='button' 
                className='btn btn-block'
                disabled={cartItems.length === 0 }
                onClick={checkoutHandler}
                > 
                  Proceed To Checkout
                </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen