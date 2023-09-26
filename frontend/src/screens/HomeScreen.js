
import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


// import products from '../products'
// import axios from 'axios'

// listProducts without redux, with components
/* function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts(){
            const {data} = await axios.get('/api/products/')
            setProducts(data)
        }
         
        fetchProducts()
    }, [])
  return (
    <div>
        <h1>Latest house</h1>
        <Row>
            {products.map(product => {
                return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                )
            })}
        </Row>
    </div>
  )
} */

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Latest house</h1> 

            { loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map(product => {
                            return (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            )
                        })}
                    </Row>
            }   
        </div>
    )
}

export default HomeScreen