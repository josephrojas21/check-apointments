import React, { Component } from 'react'
import './modalStyle.css';
import { Modal, Container, Row, Col, Button, ButtonToolbar, Table, Form, } from 'react-bootstrap'
import QRCode from 'qrcode.react';

const URL_IMAGE = process.env.REACT_APP_ROOT_IMAGES;

export default class ModalPrint extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { data_details, details_table, printable } = this.props
        let countInicial = 0;
        let countEntregar = 0;
        return (
            <Modal size="lg" {...this.props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body>
                    <Container>
                        <div className="row apoinmentModal"  >
                            <div className="col-3 col-sm-3  ">
                                <img src={URL_IMAGE + "Logo2.png"} />
                            </div>
                            <div className="col-6 col-lg-6  text-center">
                                <h5>REMISION DE ENTREGA</h5>
                            </div>
                            <div className="col-2  col-lg-2  ">
                                <QRCode value={data_details.ord_proceso.toString()} renderAs="svg" size={60} />
                            </div>
                            <div className="row" id="infoClient" >
                                <div className="col-lg-6 col-sm-12" >
                                    <ul>
                                        <li>Nit: {data_details.nit} </li>
                                        <li>{data_details.nombre}</li>
                                        <li>{data_details.dir}</li>
                                        <li>{data_details.mail}</li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-sm-12 " >
                                    <ul>
                                        <li>Documento compra: {data_details.doc_compra}</li>
                                        <li>Codigo material: {data_details.cod_material}</li>
                                        <li>Ordern fabricacion: {data_details.orden}</li>
                                        <li>Material: {data_details.material}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center col-lg-12 col-sm-3">

                                <Table size="sm" responsive="sm" striped bordered="true">
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
                                        {details_table.map((data, index) => {
                                            countInicial = countInicial + parseInt(data.cantidad_inicial)
                                            countEntregar = countEntregar + parseInt(data.cantidad_confirmada)
                                            return <tr key={index}>
                                                <td className="text-center">{parseInt(data.valor_matriz)}</td>
                                                <td className="text-center">{data.plu}</td>
                                                <td className="text-center">{parseInt(data.cantidad_pendiente)}</td>
                                                <td className="text-right">{parseInt(data.cantidad_inicial)}</td>
                                                <td className="text-right">{parseInt(data.cantidad_confirmada)}</td>
                                            </tr>
                                        })}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className="text-right font-weight-bold">Total:</td>
                                            <td className="text-right font-weight-bold">{countInicial}</td>
                                            <td className="text-right font-weight-bold">{countEntregar}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                            </div>
                            <div className="col-12 col-sm-12">
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Observaciones</Form.Label>
                                        <Form.Control size="lg" as="textarea" rows="3" cols="60" />
                                    </Form.Group>
                                </Form>
                            </div>

                            <div>
                                <div className="col-lg-6 col-sm-3 counters">
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
