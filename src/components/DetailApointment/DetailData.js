import React, { Component } from 'react'
import {ButtonToolbar, Button, Table,Form, FormControl, InputGroup} from 'react-bootstrap'
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import ModalAlert from '../Modals/modalAlert/index'
import './DetailStyle.css';



import  QRCode from 'qrcode.react';

class DetailData extends Component{
    constructor(props) {
        super(props);
        this.state ={
            //editable: true,
            details_table_temp: this.props.details_table,
            newValues: []
        }
        
    }

    

    

    render() {
        const {data_details,details_table, printable,total,onClickEditable,
               editable,onClickCancel,OnChangeInputs,OnChangeBox} = this.props;
        //const {editable} = this.state;
        let countInicial = 0 ;
        return (
            <PrintProvider>
            <div>
                <NoPrint>
                    <ButtonToolbar>
                        <Button variant="danger" className="md-5" disabled={!editable} onClick={onClickEditable}>Editar</Button>
                        <ModalAlert editable={editable} onClickCancel={onClickCancel}/>
                        {/* <Button className="ml-5" variant="secondary" disabled={editable} onClick={onClickCancel}>Cancelar</Button> */}
                        <Button variant="primary" className="ml-1" >Guardar</Button>
                    </ButtonToolbar>
                </NoPrint>
                
                <Print  name="foo">
                    <div className="row apoinment" id={printable} >
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
                                        {data_details.table.map((data, index) =>{        
                                            countInicial = countInicial + parseInt(data.cantidad_inicial)
                                            
                                            return <tr key={index}>
                                                <td>{data.valor_matriz }</td>
                                                <td>{data.plu}</td>
                                                <td>{parseInt(data.cantidad_pendiente)}</td>
                                                <td >{parseInt(data.cantidad_inicial)}</td>
                                                <td >{editable ? parseInt(data.cantidad_confirmada) : <input type="number" name={index} id="input" className="widthTexbox form-control " disabled={editable} onChange={OnChangeInputs}  defaultValue={parseInt(data.cantidad_confirmada)} size="14"  />}</td>
                                            </tr>
                                            
                                        })}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>{countInicial}</td>
                                            <td >{total}</td>
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
                        {editable ? 
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
                        :
                        <div className="row ">
                            <div className="col-3 col-sm-3 counters">
                                <InputGroup size="sm"  className="mb-1">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1" >Tulas</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="number"
                                        defaultValue={data_details.tulas}
                                        aria-describedby="basic-addon1"
                                        onChange={OnChangeBox}
                                        id="tulas"/>
                                        
                                </InputGroup> 
                            </div> 
                            <div className="col-3 col-sm-3 counters">
                                <InputGroup size="sm"  className="mb-1">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1" >Cajas</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="number"
                                        defaultValue={data_details.cajas}
                                        aria-describedby="basic-addon1"
                                        onChange={OnChangeBox}
                                        id="cajas"/>
                                </InputGroup>
                            </div>
                            <div className="col-3 col-sm-3 counters">
                                <InputGroup size="sm"  className="mb-1">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1" >Bolsas</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="number"
                                        defaultValue={data_details.bolsas}
                                        aria-describedby="basic-addon1"
                                        onChange={OnChangeBox}
                                        id="bolsas"/>
                                </InputGroup>  
                            </div>    
                        </div> }
                        
                    </div>
                </Print>
            
            </div>

        </PrintProvider>
        )
    }

}


export default DetailData;


{/* <div className="row ">
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
                        </div> */}
