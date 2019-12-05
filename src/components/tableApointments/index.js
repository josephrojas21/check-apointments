import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Form, Row } from 'react-bootstrap'
import './tableStyle.css';

class TableApointments extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data_table } = this.props
        return (
            <div className="row" id="table" >
                <div className="col-12">
                    <Form>
                        <Form.Group as={Row}>
                            <MDBDataTable
                                className="mdbDataTableStyle"
                                small={"true"}
                                striped
                                bordered
                                hover
                                autoWidth
                                pagesAmount={6}
                                bordered={"true"}
                                theadColor={"white"}
                                data={data_table}
                                infoLabel={["Viendo", "desde", "hasta", "registros"]}
                                paginationLabel={["Anterior", "Siguiente"]}
                                entriesLabel="Mostrar registros"
                                searchLabel="Buscar"
                            />
                        </Form.Group>
                    </Form>

                </div>
            </div>
        )
    }
}

export default TableApointments;