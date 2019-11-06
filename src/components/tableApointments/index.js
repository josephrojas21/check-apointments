import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import  './tableStyle.css';

const TableApointments = (dataTable) => {
    
    return (
        <div className="row" id="table" >
            <div className="col-12">
                <MDBDataTable
                    striped
                    bordered
                    hover
                    autoWidth
                    responsive
                    data={dataTable}
                    infoLabel={["Viendo", "desde", "hasta", "registros"]}
                    paginationLabel={["Anterior", "Siguiente"]}
                    entriesLabel="Mostrar registros"
                    searchLabel="Buscar"/>
            </div>
        </div>
    )

}

export default TableApointments;