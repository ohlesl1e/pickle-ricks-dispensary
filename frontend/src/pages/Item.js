import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'

const Item = ({ item }) => {
    return (
        <div>
            <br/>
            <Container style={{ textAlign: 'left' }}>
                <Row>
                    <Col sm='4'><Image src={require('../../../backend/images/' + item.picture)} fluid /></Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">from {item.seller}</Card.Subtitle>
                                <Card.Text>
                                    {item.desctiption}<br />
                                    In Stock: {item.stock}
                                </Card.Text>
                                <Button>Add to cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    item: state.itemReducer.item
})

export default connect(mapStateToProps)(Item)
