import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function Receipt(props) {

    const { order } = props;


    let date = new Date(order.Date);
    let dateString =  date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

    return(
        <Card style={{width: '18rem', marginLeft: '45%', marginTop: 10}} key={order.OrderId}>
            <Card.Body style={{padding: 0 }}>
                <Card.Header>{order.CustomerName} - {order.CustomerId}<br/>Receipt ID: {order.OrderId}<br/>Date: {dateString}</Card.Header>
                <ListGroup variant="flush">
                    {order.Items.map((item) => {
                        return <ListGroup.Item>{item.Quantity}x {item.ItemName}: ${item.Price}</ListGroup.Item>
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}