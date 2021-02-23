import React, { Component } from 'react';
import {connect} from "react-redux";



class ItemPage extends Component {
    constructor(props){
        super(props);

        this.state = {

        }

    }


    render() {

        return(
            <div>
                <p>Item page</p>
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

export default connect(mapStateToProps)(ItemPage);