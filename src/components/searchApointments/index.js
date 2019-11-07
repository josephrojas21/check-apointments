import React, { Component } from 'react';
import './searchStyle.css'

class SearchApointments extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="row" id="search">
                <div className="col-6">
                    <h4>Citas agendadas</h4>
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">@</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchApointments;