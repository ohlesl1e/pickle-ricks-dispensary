import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { selectItem } from '../redux/actions/inventoryAction'

const ItemGrid = ({ inventory, dispatch }) => {
    return (
        <div>
            <Container>
                <Row>
                    {inventory.map((item, i) =>
                        <Col sm='4' style={{ padding: '3px 3px' }} key={i}>
                            <Link to='/item' onClick={() => dispatch(selectItem(i))}>
                                <Card>
                                    <Card.Img src={require('../../../backend/images/' + item.picture)} fluid />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>from {item.seller}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    inventory: state.inventoryReducer.inventory
})

export default connect(mapStateToProps)(ItemGrid)
