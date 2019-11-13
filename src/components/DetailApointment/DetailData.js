import React, { Component } from 'react'
import {ButtonToolbar, Button, Table,Form, FormControl, InputGroup} from 'react-bootstrap'


import  QRCode from 'qrcode.react';

const DetailData = ({detailsTable, dataDetails}) => {
    let countInicial = 0 , countEntregar = 0;


    return (
        
        
        <div>
            <ButtonToolbar>
                <Button variant="danger">Editar</Button>
                <Button variant="secondry">Cancelar</Button>
                <Button variant="primary">Guardar</Button>
            </ButtonToolbar>
            <div className="row apoinment" >
                <div className="col-3   ">
                    <img src="http://localhost:9002/src/assets/img/Logo2.png"/>
                </div> 
                <div className="col-6 text-center">
                    <h5>REMISION DE ENTREGA</h5>
                </div> 
                <div className="col-2   ">
                    <QRCode value={dataDetails.ord_proceso} renderAs="svg" size={60}/>
                </div>
                <div className="row" id="infoClient">
                    <div className="col-6" >
                        <ul>
                            <li>Nit: {dataDetails.nit} </li>
                            <li>{dataDetails.nombre}</li>
                            <li>{dataDetails.dir}</li>
                            <li>{dataDetails.mail}</li>
                        </ul>
                    </div>
                    <div className="col-6" >
                        <ul>
                            <li>Documento compra: {dataDetails.doc_compra}</li>
                            <li>Codigo material: {dataDetails.cod_material}</li>
                            <li>Ordern fabricacion: {dataDetails.orden}</li>
                            <li>Material: {dataDetails.material}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
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
                                {detailsTable.map((data, index) =>{
                                    
                                    countInicial = countInicial + parseInt(data.cantidad_inicial)
                                    countEntregar = countEntregar +  parseInt(data.cantidad_confirmada)
                                    return <tr key={index}>
                                        <td>{parseInt(data.valor_matriz) }</td>
                                        <td>{data.plu}</td>
                                        <td>{parseInt(data.cantidad_pendiente)}</td>
                                        <td>{parseInt(data.cantidad_inicial)}</td>
                                        <td>{parseInt(data.cantidad_confirmada)}</td>
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
                    <div className="col-12">
                        <Form>
                            <Form.Group >
                                <Form.Label>Observciones</Form.Label>
                                <Form.Control size="lg" as="textarea" rows="3" cols="60" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 counters">
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Tulas
                                <span className="badge badge-primary badge-pill ml-2">{dataDetails.tulas}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center ml-5">
                                Cajas
                                <span className="badge badge-primary badge-pill ml-2">{dataDetails.cajas}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center ml-5">
                                Bolsas
                                <span className="badge badge-primary badge-pill ml-2">{dataDetails.bolsas}</span>
                            </li>
                        </ul>    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailData
