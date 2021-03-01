import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card, Form, Button, Table } from "react-bootstrap";
import PurchaseModal from "./PurchaseModal";
import {handleNewOrder} from "../actions/orders";


class PurchasePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            newCustomer: '',
            existingCustomer: '',
            selectedItems: {},
            errors: {customer: false, items: false, quantity: {}},
            showPurchaseModal: false,
            orderDetails: {}
        }

        this.handleSelectCustomer = this.handleSelectCustomer.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleChangeNewCustomer = this.handleChangeNewCustomer.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.openPurchaseModal = this.openPurchaseModal.bind(this);
        this.closePurchaseModal = this.closePurchaseModal.bind(this);
        this.buildOrder = this.buildOrder.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);

        this.customers = {};
        this.items = {};
    }


    //Quick fix instead of changing the rest of the project
    componentDidMount() {
        this.props.customers.forEach((customer) => {
            this.customers[customer.CustomerId] = customer;
        });

        this.props.items.forEach((item) => {
            this.items[item.ItemId] = item;
        });

    }

    handleChangeNewCustomer(event){
        this.setState({newCustomer: event.target.value});
    }

    handleSelectCustomer(event) {
        this.setState({existingCustomer: event.target.value})
    }

    handleSelectItem(event){
        let ItemId = parseInt(event.target.id);
        let selected = this.state.selectedItems;
        if(selected.hasOwnProperty(event.target.id)){
            delete selected[ItemId];
            this.setState({selectedItems: selected});
        } else{
            selected[ItemId] = 0;
            this.setState({selectedItems: selected});
        }
    }

    handleChangeQuantity(event){
        let value = Number(event.target.value);
        let ItemId = event.target.id;
        let selectedItems = this.state.selectedItems;
        if(Number.isInteger(value) && Number(value)>=0){
            selectedItems[ItemId] = value;
            this.setState({selectedItems});
        }
    }

    clearForm(){
        this.setState({
            newCustomer: '',
            existingCustomer: '',
            selectedItems: {},
            errors: {customer: false, items: false, quantity: {}}
        });
    }

    buildOrder(){
        let order = {
            Items: [],
            Total: 0,
            Date: new Date(),
            customerId: null
        };

        if(this.state.existingCustomer!==''){
            let customerId = this.state.existingCustomer;
            order = {...order, customerName: this.customers[customerId].CustomerName, customerId: customerId};

        } else {
            order = {...order, customerName: this.state.newCustomer};
        }

        Object.keys(this.state.selectedItems).forEach((itemId) => {
            let itemName = this.items[itemId].ItemName;
            let quantity = this.state.selectedItems[itemId];
            let price = this.items[itemId].Price;

            order.Items.push({
                ItemId: itemId,
                ItemName: itemName,
                Quantity: quantity,
                Price: price
            });

            order.Total = order.Total + (price)*quantity;
        });

        return order;
    }


    openPurchaseModal(){
        let errors = {customer: false, items: false, quantity: {}};
        if (this.state.existingCustomer==='' && this.state.newCustomer===''){
            errors.customer = true;
        }
        if (Object.keys(this.state.selectedItems).length===0){
            errors.items = true;
        } else {
            Object.keys(this.state.selectedItems).forEach((itemId) => {
                if(this.state.selectedItems[itemId]===0){
                    errors.quantity[itemId] = true;
                }
            });
        }

        if(errors.customer || errors.items || Object.keys(errors.quantity).length>0){
            this.setState({errors: errors});
        } else{
            let newOrder = this.buildOrder();
            this.setState({errors: errors, showPurchaseModal: true, orderDetails: newOrder});
        }
    }

    closePurchaseModal(){
        this.setState({showPurchaseModal: false, orderDetails: {}});
    }

    handlePurchase(){
        this.props.dispatch(handleNewOrder(this.state.orderDetails, this.props.authedUser.authToken));
    }


    render() {
        const { customers, items } = this.props;

        let modal = null;
        if(this.state.showPurchaseModal){
            modal = <PurchaseModal showModal={this.state.showPurchaseModal} closeModal={this.closePurchaseModal} handlePurchase={this.handlePurchase} order={this.state.orderDetails}/>
        }

        return(
            <div style={{marginTop: 100}}>
                <Card bg='light' border='info' style={{width: 700, margin: '0 auto', marginTop: 75}}>
                    <Card.Header style={{textAlign: 'center', fontSize: 30}}>Submit New Purchase</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>New Customer</Form.Label>
                                <Form.Control style={{width: 250}} placeholder="Customer Name" value={this.state.newCustomer} onChange={this.handleChangeNewCustomer} disabled={this.state.existingCustomer}/>
                                <br/>
                                <Form.Label>Existing Customer</Form.Label>
                                <Form.Control style={{width: 250}} as='select' value={this.state.existingCustomer} onChange={this.handleSelectCustomer}>
                                    <option value=''>Select...</option>
                                    {customers.map((customer) => {
                                        return <option key={customer.CustomerId} value={customer.CustomerId}>{customer.CustomerName} - {customer.CustomerId}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Label>Items Purchased</Form.Label>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => {
                                        return <tr>
                                            <th><Form.Check id={item.ItemId} checked={this.state.selectedItems.hasOwnProperty(item.ItemId)} onChange={this.handleSelectItem}/></th>
                                            <th>{item.ItemName}</th>
                                            <th>${item.Price.toFixed(2)}</th>
                                            <th><Form.Control id={item.ItemId} value={this.state.selectedItems[item.ItemId]} onChange={this.handleChangeQuantity} disabled={!this.state.selectedItems.hasOwnProperty(item.ItemId)} style={{width:50, marginLeft: 20, marginRight: 30}}/></th>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Form>
                    </Card.Body>

                    <Card.Footer>
                        <div className="float-right" >
                            <Button variant="secondary" onClick={this.clearForm}>Clear</Button>
                            <Button style={{marginLeft: 10}} onClick={this.openPurchaseModal}>Submit</Button>
                        </div>
                    </Card.Footer>
                </Card>
                {modal}
            </div>
        );
    }
}

function mapStateToProps({ customers, items, authedUser }, props){
    return {
        customers,
        items,
        authedUser,
        ...props
    }
}

export default connect(mapStateToProps)(PurchasePage);
