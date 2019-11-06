import React, { Component } from 'react';
import './DetailStyle.css'

export default class DetailsApointments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="row" id="search">
                <div className="col-6">
                    <h5>Citas agendadas</h5>
                </div>
            </div>
        )
    }
}
