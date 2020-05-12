import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Container, Image, Button } from 'react-bootstrap'

const Cart = ({ cart, dispatch }) => {
    return (
        <div>
            <br />
            <Container style={{ textAlign: "left" }}>
                <h2>Shopping Cart</h2>
                {
                    (cart.length === 0) ?
                        (<h4 className='text-muted'>Your cart is empty</h4>) :
                        (<div>
                            <ListGroup>
                                {cart.map((cartItem, i) =>
                                    <ListGroup.Item key={i}>
                                        <span>
                                            <Image
                                                src={require('../../../backend/images/' + cartItem.item.picture)}
                                                style={{ maxHeight: '100px', float: "left", marginRight: '10px' }}
                                            />
                                            {cartItem.item.title}<br />
                                Quantity: {cartItem.amount}
                                        </span>
                                        <Button variant='secondary' style={{ float: 'right' }}>X</Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup><br/>
                            {/* <Button>Proceed to checkout</Button> */}
                            <LinkButton
                                to='/Checkout'
                                >Proceed to checkout
                            </LinkButton>
                        </div>)
                }
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cart: state.userReducer.cart
})

export default connect(mapStateToProps)(Cart)
