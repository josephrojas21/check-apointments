import React from 'react'
import {ButtonToolbar, Button, Table,Form} from 'react-bootstrap'
import Img from 'react-image'

import  QRCode from 'qrcode.react';

const DetailData = (props) => {
    
    return (
        <div>
            <ButtonToolbar>
                <Button variant="danger">Editar</Button>
                <Button variant="Primary">Cancelar</Button>
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
                    <QRCode value="492" renderAs="svg" size={60}/>
                </div>
                <div className="row" id="infoClient">
                    <div className="col-6" >
                        <ul>
                            <li>Nit: 874546654</li>
                            <li>CONFECCIONARTE S.A.S</li>
                            <li>Cr 50 # 45 fur 102</li>
                            <li>confeccionarte@hotmai.com</li>
                        </ul>
                    </div>
                    <div className="col-6" >
                        <ul>
                            <li>Documnto compra: 874546654</li>
                            <li>Codigo material: 2452163</li>
                            <li>Ordern fabricacion: 641163</li>
                            <li>MAterial: TRIO DE CAMISET</li>
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
                                <tr>
                                    <td>1</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>343</td>
                                    <td>567</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Form>
                            <Form.Group >
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control size="lg" as="textarea" rows="3" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailData
