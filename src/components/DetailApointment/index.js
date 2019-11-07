import React, { Component, Fragment } from 'react';
import DetailData from './DetailData'
import './DetailStyle.css'

export default class DetailsApointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const {dataDetails} = this.props
        return (
            <Fragment>
                <div className="row" id="detailsTitle">
                    <div className="col-12">
                        <h4>Detalle citas PCFK1</h4>
                    </div>
                </div>
                <div className="row" id="detailsBody">
                    <div className="col-12">
                        <DetailData data={dataDetails}/>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}
