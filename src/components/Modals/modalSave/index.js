import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button, Card, Form, Table } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import DataApointements from '../../../services/data'
import jsonSave from '../../../services/models/saveApointment';
import './modalSaveStyles.css';
import { FaRegSave } from 'react-icons/fa';


//MERJORAR AXIOS
import axios from 'axios';

const URL = process.env.REACT_APP_ROOT_API;
const URL_IMAGE = process.env.REACT_APP_ROOT_IMAGES

function ModalSave(props) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);


    const handleClose = () => setShow(false);



    const handleConfirm = () => {

        const Swal = require('sweetalert2')

        setLoading(true);

        console.log('Llegó a guardar: ', props.data_details)

        const { data_details } = props;

        let jsonFinal =
        {
            PRODUCCION:
            {
                CABECERA:
                {
                    nit: "",
                    nombre_acreedor: "",
                    direccion: "",
                    correo_electronico: "",
                    doc_compra: "",
                    orden_fabricacion: "",
                    material: "",
                    texto_material: "",
                    tulas: "0",
                    cajas: "0",
                    bolsas: "0",
                    consecutivo_ord_procesa: null,
                    transportador: "",
                    hora_recogida: null,
                    fecha_recogida: null,
                    campana_orden: null,
                    prioridad: null,
                    fecha_entrega: null,
                    categoria_stock: "",
                    usuario: null,
                    transporte_propio: false,
                    taller: null,
                    observacion: null,
                    Fecha_creacion: null,
                    Hora_creacion: null,
                    DETALLE: []
                }

            }
        }

        jsonFinal.PRODUCCION.CABECERA.nit = String(data_details.nit);
        jsonFinal.PRODUCCION.CABECERA.nombre_acreedor = String(data_details.nombre);
        jsonFinal.PRODUCCION.CABECERA.direccion = String(data_details.dir);
        jsonFinal.PRODUCCION.CABECERA.correo_electronico = String(data_details.mail);
        jsonFinal.PRODUCCION.CABECERA.doc_compra = String(data_details.doc_compra);
        jsonFinal.PRODUCCION.CABECERA.orden_fabricacion = String(data_details.orden);
        jsonFinal.PRODUCCION.CABECERA.material = String(data_details.cod_material);
        jsonFinal.PRODUCCION.CABECERA.texto_material = String(data_details.material);
        jsonFinal.PRODUCCION.CABECERA.categoria_stock = String(data_details.categoria);
        jsonFinal.PRODUCCION.CABECERA.consecutivo_ord_procesa = String(data_details.ord_proceso);
        jsonFinal.PRODUCCION.CABECERA.transporte_propio = data_details.transporte_propio;
        jsonFinal.PRODUCCION.CABECERA.tulas = String(data_details.tulas);
        jsonFinal.PRODUCCION.CABECERA.bolsas = String(data_details.bolsas);
        jsonFinal.PRODUCCION.CABECERA.cajas = String(data_details.cajas);
        jsonFinal.PRODUCCION.CABECERA.transportador = String(data_details.tranportador);
        jsonFinal.PRODUCCION.CABECERA.observacion = data_details.observacion;


        let ordersDetail = data_details.table;
        ordersDetail.map((details, index) => {

            const { valor_matriz, plu, posicion_pedido, cantidad_pendiente, cantidad_maxima, cantidad_inicial, cantidad_entregar, cantidad_confirmada, ilimitado } = details

            jsonFinal.PRODUCCION.CABECERA.DETALLE.push({
                valor_matriz: valor_matriz,
                plu: String(plu),
                cantidad_inicial: cantidad_inicial ? String(parseInt(cantidad_inicial)) : "0",
                cantidad_pendiente: cantidad_pendiente ? String(parseInt(cantidad_pendiente)) : "0",
                cantidad_entregar: cantidad_entregar ? String(parseInt(cantidad_entregar)) : "0",
                cantidad_confirmada: cantidad_confirmada ? String(parseInt(cantidad_confirmada)) : "0",
                cantidad_maxima: cantidad_maxima ? String(parseInt(cantidad_maxima)) : "0",
                posicion_pedido: posicion_pedido ? String(parseInt(posicion_pedido)) : "0",
                Consecutivoscita: null
            });
        })

        console.log('RESPUESTA DE FINAL JSON: ', jsonFinal);

        console.log('URL:', URL);

        // Promise.all([
        //     axios.post(`${URL}apointments/updatesApointment`,jsonFinal)
        // ]).then(res => {
        //     console.log('Respuesta dentro a post1 actualizar: ', res); 
        //     setSaved(true);    


        // })


        DataApointements.saveApointment(jsonFinal).then(res => {
            setSaved(true);
            console.log('RESPUESTA GUARDADO 2 :', res);
            if (res.data.Resp_MT_PORTALPROVEEDOR_ACTUALIZAPRODUCCION27.RETORNO.retorno == "Proceso Exitoso") {
                Swal.fire(
                    'Completado!',
                    'La cita fue modificada con exito!',
                    'success'
                ).then((result) => {
                    window.location.reload();
                })
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error.',
                    text: 'Error en comunicación con el servidor. ' + res.data.Resp_MT_PORTALPROVEEDOR_ACTUALIZAPRODUCCION27.RETORNO.retorno 
                })
            }
        })



    };

    const handleShow = () => setShow(true);


    const renderheaderPlus = () => {
        const columns = ['Número cita', 'Categoria', 'Valor Matriz', 'Cantidad Entregar', 'Cantidad Confirmada'];
        return columns.map((item, index) => {
            return <th className="center_td" key={item}>{item}</th>
        })
    };

    const renderBodyPlus = () => {

        const { data_details } = props;

        let cont = 0;
        for (let i of data_details.table) {
            cont = parseInt(cont) + parseInt(i.cantidad_entregar);
        }

        if (cont == 0)
            return null

        return data_details.table.map((detail, index) => {
            const { valor_matriz, cantidad_confirmada, cantidad_entregar } = detail //destructuring
            return (
                <tr key={index}>
                    <td className="center_td">{data_details.ord_proceso}</td>
                    <td className="center_td">{data_details.categoria}</td>
                    <td className="center_td"> {valor_matriz}</td>
                    <td className="center_td">{parseInt(cantidad_entregar)}</td>
                    <td className="center_td">{parseInt(cantidad_confirmada)}</td>
                </tr>
            )
        })

    };

    const renderTotal = () => {

        const { data_details } = props;

        let contdelivery = 0;
        let contconfirmed = 0;

        for (let i of data_details.table) {
            contdelivery = parseInt(contdelivery) + parseInt(i.cantidad_entregar);
            contconfirmed = parseInt(contconfirmed) + parseInt(i.cantidad_confirmada);
        }

        return (
            <tr key={'Total'}>
                <td colSpan="3" className="right_td"> <strong>{'TOTALES:'}</strong></td>
                <td className="center_td">{contdelivery}</td>
                <td className="center_td">{contconfirmed}</td>
            </tr>
        )
    };

    const renderCategoryAndPackages = () => {

        const { data_details } = props;

        return (
            <tr>
                {/* <td className="center_td">{jsonfinal.PRODUCCION.CABECERA.categoria_stock}</td> */}
                <td>

                    <Form>
                        <Form.Group ms="12" md="12">
                            <Form.Row>
                                <Col className="center_td">
                                    <Form.Label >{data_details.categoria}</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="inputGroupPrepend"> Tulas </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control aria-describedby="inputGroupPrepend" readOnly default="0" value={data_details.tulas == '' ? '0' : data_details.tulas} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup >
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="inputGroupPrepend1" > Cajas </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            aria-describedby="inputGroupPrepend" readOnly default="0" value={data_details.cajas == '' ? '0' : data_details.cajas} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup >
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="inputGroupPrepend2" > Bolsas </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            aria-describedby="inputGroupPrepend2" readOnly default="0" value={data_details.bolsas == '' ? '0' : data_details.bolsas} />
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>

                </td>
            </tr>
        )
    }


    const renderheaderResult = () => {
        const columns = ['Item', 'Tipo', 'Número Cita', 'Estado'];
        return columns.map((item, index) => {
            return <th className="center_td" key={item}>{item}</th>
        })
    };

    const renderBodyResult = () => {

        const { data_details } = props;
        return (
            <tr key={1}>
                <td className="center_td">{1}</td>
                <td className="center_td">{data_details.categoria}</td>
                <td className="center_td"> {data_details.ord_proceso}</td>
                {!saved && <td className="center_td"><span className="parpadea text">Procesando</span></td>}
                {saved && <td className="center_td">Completado</td>}
            </tr>
        )
    };


    const renderLoading = () => {
        return (
            <div className="col-12 text-center">
                <img src= {URL_IMAGE + "load.gif"}
                    alt="Procesando"
                    width="200"
                    height="141"></img>
            </div>
        )
    };



    return (
        <>
            <Button variant="primary" className="ml-1" disabled={props.editable} onClick={handleShow} ><FaRegSave className="mb-1" /> Guardar</Button>


            <Modal onHide={handleShow} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header >
                    <img src={URL_IMAGE + "Logo2.png"} style={{ width: "15%" }} />
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modificar Cita Recogida
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {!loading &&
                            <Card>
                                <Card.Header id="cardheader">Resumen</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <div className="col-6 col-xs-12" >
                                            <ul>
                                                <li>Nit: {props.data_details.material} </li>
                                                <li>Documento fabricacion: {props.data_details.orden}</li>
                                                <li>Codigo material: {props.data_details.cod_material}</li>
                                            </ul>
                                        </div>
                                        <div className="text-center col-6 col-xs-12">
                                            <div id="cbox">
                                                <input className="m-3" type="checkbox" id="cbox" defaultChecked={true} /> <label htmlFor="cbox">Transporte propio?</label>
                                            </div>
                                        </div>
                                    </Row>
                                    <div>
                                        <div className="normalPaddings" >
                                            <div id='tableStyles' className="col-12 col-sm-12 ">
                                                <Table className="TableStyle" striped bordered hover>
                                                    <tbody>
                                                        <tr>{renderheaderPlus()}</tr>
                                                        {renderBodyPlus()}
                                                        {renderTotal()}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className="downPaddings" >
                                            <div id='categoriesStyles' className="col-12 col-sm-12 ">
                                                <Table borderless variant>
                                                    <tbody>
                                                        {renderCategoryAndPackages()}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        }

                        {loading &&
                            <Card>
                                <Card.Header id="cardheader">Resultado</Card.Header>
                                <Card.Body>
                                    <div>
                                        <div className="normalPaddings" >
                                            <div id='tableStyles' className="col-12 col-sm-12 ">
                                                <Table className="TableStyle" striped bordered hover>
                                                    <tbody>
                                                        <tr>{renderheaderResult()}</tr>
                                                        {renderBodyResult()}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        {!saved &&
                                            <div className="downPaddings" >
                                                {renderLoading()}
                                            </div>
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                        }
                    </Container>
                </Modal.Body>
                {!loading && <Modal.Footer>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="secondary" onClick={handleConfirm}>Guardar</Button>
                </Modal.Footer>}
            </Modal>
        </>
    );
}

export default ModalSave

