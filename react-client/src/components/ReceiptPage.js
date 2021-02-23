import React, { Component } from 'react';
import {connect} from "react-redux";
import Receipt from "./Receipt.js"



class ReceiptPage extends Component {
    constructor(props){
        super(props);
    }


    render() {
        const { orders } = this.props;

        return(
            <div style={{marginTop: 100}}>
                {orders.map((order) => {
                    return <Receipt order={order}/>
                })}
            </div>
        );
    }
}

function mapStateToProps({ customers, items, orders }, props){
    return {
        customers,
        items,
        orders,
        ...props
    }
}

export default connect(mapStateToProps)(ReceiptPage);
