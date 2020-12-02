import './../App.css';
import { connect } from 'react-redux';
import * as actions from './../actions';
import React, { Component } from 'react';

class Child extends Component {
    constructor(props) {
        super();

        this.state = {
        }
    }

    render() {

        let priceData = [];
        if(this.props.data){

            priceData = this.props.data.subscriptions.map((item, index) => {
        
            return  <li><span>{item.name}</span> <h3>{item.price === 0 ? "Free" : item.price}<sup>{item.price === 0 ? "" : "€"}</sup></h3></li>
        })}
        return(
            <ul>
                <li>
                    <div class="app-item">
                        <div class="box-info">
                            <div class="box-info--content">
                                <div class="description">
                                    <h1>{this.props.data ? this.props.data.name : ""}</h1>
                                    <p>{this.props.data ? this.props.data.description : ""}</p>
                                </div>
                                <div class="tags"><span>{this.props.category ? this.props.category : ""}</span></div>
                            </div>
                            <div class="box-info--footer">
                                <ul>
                                    {priceData}
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        )}
}

export default connect(
    null,
    actions
)(Child);
