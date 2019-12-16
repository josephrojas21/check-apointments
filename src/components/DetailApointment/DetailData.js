import React, { Component } from 'react'
import { ButtonToolbar, Button, Table, Form, FormControl, InputGroup, Container, Row, Col, } from 'react-bootstrap'
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import ModalAlert from '../Modals/modalAlert/index'
import ModalSave from '../Modals/modalSave/index'
import './DetailStyle.css';
import { FaRegEdit } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const PERMISSIONS_TO_EDIT = process.env.REACT_PERMISSIONS_TO_EDIT;
const PERMISSIONS_TO_CANCEL = process.env.REACT_PERMISSIONS_TO_CANCEL;
const PERMISSIONS_TO_SAVE = process.env.REACT_PERMISSIONS_TO_SAVE;
const URL_IMAGE = process.env.REACT_APP_ROOT_IMAGES

class DetailData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Disabled_Cancel: false,
            Disabled_Save: false
        }

    }

    getPermmision(item) {
        let data = JSON.parse(localStorage.getItem("moduleApp"))
        return data.acciones.filter(word => word.asegurableid == item).length > 0
    }

    componentDidMount() {

        console.log('componentDidMount');
        if (!this.getPermmision(PERMISSIONS_TO_EDIT)) {
            document.getElementById('Editbutton').disabled = true;
        }
        if (!this.getPermmision(PERMISSIONS_TO_CANCEL)) {
            this.setState({
                Disabled_Cancel: true
            })
        }
        if (!this.getPermmision(PERMISSIONS_TO_SAVE)) {
            this.setState({
                Disabled_Save: true
            })
        }
    }

    ChangeValueInputObservation = event => {
        console.log('Enmtro a blur');
        const { ChangeValueObservation } = this.props;
        let value = '';
        value = event.target.value.trim();
        ChangeValueObservation(value);
    }


    render() {
        const { data_details, printable, total, onClickEditable,
            editable, OnChangeInputs, OnChangeBox, ChangeValueInputObservation } = this.props;

        const { Disabled_Cancel, Disabled_Save } = this.state;
        //const {editable} = this.state;
        let countInicial = 0;
        return (
            <PrintProvider>
                <div>
                    <div id="row-bordered-totals">
                        <NoPrint>
                            <ButtonToolbar>
                                <Col>
                                    <Button id="Editbutton" variant="danger" disabled={!editable} onClick={onClickEditable}><FaRegEdit className="iconstyle" /> Editar</Button>
                                </Col>
                                <Col>
                                    {Disabled_Cancel == true ? <ModalAlert editable={true} /> : <ModalAlert editable={editable} />}
                                </Col>
                                <Col>
                                    {Disabled_Save == true ? <ModalSave editable={true} data_details={data_details} /> : <ModalSave editable={editable} data_details={data_details} />}

                                </Col>
                            </ButtonToolbar>
                        </NoPrint>
                    </div>
                    <Print name="foo">
                        <div className="row apoinment" id={printable} >
                            <div className="col-3 col-sm-3  ">
                                <img src={URL_IMAGE + "Logo2.png"} />
                            </div>
                            <div className="col-6 col-sm-6  text-center">
                                <h5>REMISION DE ENTREGA</h5>
                            </div>
                            <div className="col-2  col-sm-2  ">
                                <QRCode value={data_details.ord_proceso.toString()} renderAs="svg" size={60} />
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
                                            {data_details.table.map((data, index) => {
                                                countInicial = countInicial + parseInt(data.cantidad_inicial)

                                                return <tr key={index}>
                                                    <td>{data.valor_matriz}</td>
                                                    <td>{data.plu}</td>
                                                    <td>{parseInt(data.cantidad_pendiente)}</td>
                                                    <td >{parseInt(data.cantidad_inicial)}</td>
                                                    <td >{editable ? parseInt(data.cantidad_confirmada) : <input type="number" name={index} id="input" className="widthTexbox form-control " disabled={editable} onChange={OnChangeInputs} defaultValue={parseInt(data.cantidad_confirmada)} size="14" min={0} />}</td>
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
                            <div className="widthfull">
                                <div className="col-12 col-sm-12">
                                    <label htmlFor="exampleFormControlTextarea1">
                                        Observaciones
                                    </label>
                                    {editable ? <textarea
                                        className="form-control"
                                        id={'Observations'}
                                        rows="3"
                                        disabled>
                                        {data_details.observacion}
                                    </textarea>
                                        :
                                        <textarea
                                            className="form-control"
                                            id={'Observations'}
                                            rows="3"
                                            onBlur={this.ChangeValueInputObservation}>
                                            {data_details.observacion}
                                        </textarea>}
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
                                        <InputGroup size="sm" className="mb-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1" >Tulas</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="number"
                                                defaultValue={data_details.tulas}
                                                aria-describedby="basic-addon1"
                                                onChange={OnChangeBox}
                                                id="tulas"
                                                min={0} />

                                        </InputGroup>
                                    </div>
                                    <div className="col-3 col-sm-3 counters">
                                        <InputGroup size="sm" className="mb-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1" >Cajas</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="number"
                                                defaultValue={data_details.cajas}
                                                aria-describedby="basic-addon1"
                                                onChange={OnChangeBox}
                                                id="cajas"
                                                min={0} />
                                        </InputGroup>
                                    </div>
                                    <div className="col-3 col-sm-3 counters">
                                        <InputGroup size="sm" className="mb-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1" >Bolsas</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                type="number"
                                                defaultValue={data_details.bolsas}
                                                aria-describedby="basic-addon1"
                                                onChange={OnChangeBox}
                                                id="bolsas"
                                                min={0} />
                                        </InputGroup>
                                    </div>
                                </div>}

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
