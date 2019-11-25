import React, { Component, Fragment } from 'react';
import DetailData from './DetailData'
import './DetailStyle.css';
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

export default class DetailsApointments extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {details_table, selected, data_details,printable,editable,
               total,onClickEditable,onClickCancel,OnChangeInputs} = this.props
        
        return (
            <Fragment>
                <PrintProvider>
                    <NoPrint>
                    <div className="row" id="detailsTitle">
                        <div className="col-12">
                            <h4>Detalle citas {data_details.categoria}</h4>
                            
                        </div>
                    </div>
                    </NoPrint>
                    <div className="row" id="detailsBody">
                        <div className="col-12" id="printJS-form" >
                            
                            {selected ?  <DetailData 
                                            editable={editable}  
                                            printable={printable}  
                                            details_table={details_table} 
                                            data_details={data_details} 
                                            total={total}
                                            onClickEditable={onClickEditable}
                                            onClickCancel={onClickCancel}
                                            OnChangeInputs={OnChangeInputs}/> : <h1>seleccione una cita</h1>}
                            
                        </div>
                    </div>
                </PrintProvider>
            </Fragment>
            
        )
    }
}
