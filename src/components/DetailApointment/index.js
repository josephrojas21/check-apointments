import React, { Component, Fragment } from 'react';
import DetailData from './DetailData'
import './DetailStyle.css';
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { FaArrowLeft } from 'react-icons/fa';

export default class DetailsApointments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { details_table, selected, data_details, printable, editable,
            total, onClickEditable, onClickCancel, OnChangeInputs, OnChangeBox } = this.props

        return (
            <Fragment>
                <PrintProvider>
                    <div>
                        {selected && <div className="row" id="detailsBody">
                            <div className="col-12 text-center">
                                <NoPrint>
                                    <div className="col-12" id="detailsTitle">
                                        <h5>Detalle citas {data_details.categoria}</h5>
                                    </div>
                                </NoPrint>
                            </div>

                            <div className="col-12" id="printJS-form" >

                                <DetailData
                                    editable={editable}
                                    printable={printable}
                                    details_table={details_table}
                                    data_details={data_details}
                                    total={total}
                                    onClickEditable={onClickEditable}
                                    OnChangeInputs={OnChangeInputs}
                                    OnChangeBox={OnChangeBox} />
                            </div>
                        </div>}
                        {!selected && <div className="mx-auto"><br /><br /><br /><br /><br /><br /><br /><br /><br /><h5>{<FaArrowLeft />} Seleccione una orden del panel de ordenes</h5></div>}
                    </div>
                </PrintProvider>
            </Fragment>

        )
    }
}
