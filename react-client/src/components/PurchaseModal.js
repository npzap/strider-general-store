import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';



export default function PurchaseModal(props) {
    const { showModal, closeModal, order, handlePurchase } = props;

    return(
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>Confirm Purchase</Modal.Header>
            <Modal.Body>
                <p>Customer Name: {order.customerName}</p>
                {order.customerId ? (
                    <p>Customer ID: {order.customerId}</p>
                ):(
                    <p>Customer ID: New Customer</p>
                )}
                <ListGroup>
                    {order.Items.map((item) => {
                        return (<ListGroup.Item variant="light">
                            {item.Quantity}x {item.ItemName}: ${item.Price}
                        </ListGroup.Item>)
                    })}
                    <ListGroup.Item variant="dark">
                        Total: ${order.Total}
                    </ListGroup.Item>
                </ListGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={closeModal}>Cancel</Button>
                <Button onClick={handlePurchase}>Confirm Purchase</Button>
            </Modal.Footer>
        </Modal>
    );
}