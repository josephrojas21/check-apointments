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
            <div className="col-12">
                <h5>Citas agendadas</h5>
            </div>          
        </div>
        )
    }
}

export default SearchApointments;