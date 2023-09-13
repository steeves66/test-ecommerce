import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, ListGroup, Button, Card, Image} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productsActions'

/* function ProductScreen() {
    let { id } = useParams();
    // const product = products.find((p) => p._id == id)
    
    
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProducts(id){
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
         
        fetchProducts(id)
    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Price:</Col>
                                    <Col><strong> ${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-grid gap-2">
                                <Button className='btn btn-block' disabled={product.countInStock == 0} type="button">Add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
} */

function ProductScreen() {
    let { id } = useParams();

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} =  productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [])



    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>

            {loading ? 
                <Loader />
                : error 
                    ? <Message variant="danger">{error}</Message>
                : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Price:</Col>
                                            <Col><strong> ${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-grid gap-2">
                                        <Button className='btn btn-block' disabled={product.countInStock == 0} type="button">Add to cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            
        </div>
    )
}

export default ProductScreen