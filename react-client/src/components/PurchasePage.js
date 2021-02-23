import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card, Form, Button, Table } from "react-bootstrap";
import PurchaseModal from "./PurchaseModal";


class PurchasePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            newCustomer: '',
            existingCustomer: '',
            selectedItems: {},
            showPurchaseModal: false,
            order: {}
        }

        this.handleSelectCustomer = this.handleSelectCustomer.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleChangeNewCustomer = this.handleChangeNewCustomer.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.openPurchaseModal = this.openPurchaseModal.bind(this);
        this.closePurchaseModal = this.closePurchaseModal.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
    }

    handleChangeNewCustomer(event){
        this.setState({newCustomer: event.target.value});
    }

    handleSelectCustomer(event) {
        this.setState({existingCustomer: event.target.value})
    }

    handleSelectItem(event){
        let ItemId = event.target.id;
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

    openPurchaseModal(){
        // let selectedItems = this.state.selectedItems;
        // if(!((this.state.existingCustomer=='' && this.state.newCustomer=='') && Object.keys(selectedItems).length==0)){
        //     let total = selectedItems => Object.values(selectedItems).reduce((a, b) => a + b);
        //     if (total > 0){
        //         let order = {};
        //         if(this.state.existingCustomer){
        //
        //         }
        //
        //         this.setState({showPurchaseModal: true});
        //     }
        // }
    }

    closePurchaseModal(){
        this.setState({showPurchaseModal: false});
    }

    handlePurchase(order){

    }


    render() {
        const { customers, items } = this.props;

        // let modal = null;
        // if(this.state.showPurchaseModal){
        //     let customer = this.state.existingCustomer=='' ? this.state.newCustomer : this.state.existingCustomer;
        //     modal = <PurchaseModal showModal={this.state.showPurchaseModal} handlePurchase={this.handlePurchase} customer={customer} items={this.state.selectedItems}/>
        // }

        console.log(this.state.selectedItems);
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

                    <Card.Footer style={{textAlign: 'center'}}>
                        <Button disabled onClick={this.openPurchaseModal}>Submit</Button>
                    </Card.Footer>
                </Card>

            </div>
        );
    }
}

function mapStateToProps({ customers, items, orders }, props){
    return {
        customers,
        items,
        ...props
    }
}

export default connect(mapStateToProps)(PurchasePage);
