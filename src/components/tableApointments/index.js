import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import  './tableStyle.css';

class TableApointments extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {data_table} = this.props
        return (
            <div className="row" id="table" >
            <div className="col-12">
                <MDBDataTable
                    striped
                    bordered
                    hover
                    autoWidth
                    responsive
                    data={data_table}
                    infoLabel={["Viendo", "desde", "hasta", "registros"]}
                    paginationLabel={["Anterior", "Siguiente"]}
                    entriesLabel="Mostrar registros"
                    searchLabel="Buscar"/>
            </div>
        </div>
        )
    }
}

export default TableApointments;