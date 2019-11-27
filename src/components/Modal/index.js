import React, { Component } from 'react'
import {Modal, Container, Row, Col,Button,ButtonToolbar,Table,Form, } from 'react-bootstrap'

import  QRCode from 'qrcode.react';

export default class ModalPrint extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {data_details,details_table,printable} = this.props
        let countInicial = 0 ;
        let countEntregar = 0;
        return (
            <Modal size="lg" {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Using Grid in Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                  
                    <div className="row apoinment"  >
                        <div className="col-3 col-sm-3  ">
                            <img src="http://localhost:9002/src/assets/img/Logo2.png"/>
                        </div> 
                        <div className="col-6 col-sm-6  text-center">
                            <h5>REMISION DE ENTREGA</h5>
                        </div> 
                        <div className="col-2  col-sm-2  ">
                            <QRCode value={data_details.ord_proceso.toString()} renderAs="svg" size={60}/>
                        </div>
                        <div className="row" id="infoClient" >
                            <div className="col-6 col-sm-6 " >
                                <ul>
                                    <li>Nit: {data_details.nit} </li>
                                    <li>{data_details.nombre}</li>
                                    <li>{data_details.dir}</li>
                                    <li>{data_details.mail}</li> 
                                </ul>
                            </div>
                            <div className="col-6 col-sm-6 " >
                                <ul>
                                    <li>Documento compra: {data_details.doc_compra}</li>
                                    <li>Codigo material: {data_details.cod_material}</li>
                                    <li>Ordern fabricacion: {data_details.orden}</li>
                                    <li>Material: {data_details.material}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-12 col-sm-12">
                                <Table responsive="sm" striped bordered="true">
                                    <thead>
                                        <tr>
                                            <th>Valor Matriz</th>
                                            <th>PLU</th>
                                            <th>Cantidad Pendiente</th>
                                            <th>Entrega Inicial</th>
                                            <th>Cantidad Confirmada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details_table.map((data, index) =>{
                                            countInicial = countInicial + parseInt(data.cantidad_inicial)
                                            countEntregar = countEntregar +  parseInt(data.cantidad_confirmada)
                                            return <tr key={index}>
                                                <td>{parseInt(data.valor_matriz) }</td>
                                                <td>{data.plu}</td>
                                                <td>{parseInt(data.cantidad_pendiente)}</td>
                                                <td >{parseInt(data.cantidad_inicial)}</td>
                                                <td >{parseInt(data.cantidad_confirmada)}</td>
                                            </tr>
                                        })}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>{countInicial}</td>
                                            <td>{countEntregar}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12">
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Observciones</Form.Label>
                                        <Form.Control size="lg" as="textarea" rows="3" cols="60" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 col-sm-12 counters">
                                <ul className="list-group list-group-horizontal">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Tulas
                                        <span className="badge badge-primary badge-pill ml-2">{data_details.tulas}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center ml-5">
                                        Cajas
                                        <span className="badge badge-primary badge-pill ml-2">{data_details.cajas}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center ml-5">
                                        Bolsas
                                        <span className="badge badge-primary badge-pill ml-2">{data_details.bolsas}</span>
                                    </li>
                                </ul>    
                            </div>
                        </div>
                    </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cerrar</Button>
                    <Button onClick={() => window.print()}>Imprimir</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
