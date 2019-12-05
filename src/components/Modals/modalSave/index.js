import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button, Card, Accordion, Form, } from 'react-bootstrap';
import DataApointements from '../../../services/data'
import jsonSave from '../../../services/models/saveApointment';
import './modalSaveStyles.css';
import {FaRegSave} from 'react-icons/fa';



function ModalSave(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        // DataApointements.saveApointment(props.data_details).then(res =>{
        //     console.log(res);
            
        // })
        console.log(props.data_details);
        

    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className="ml-1" disabled={props.editable} onClick={handleShow} ><FaRegSave className="mb-1"/> Guardar</Button>


            <Modal onHide={handleShow} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header >
                    <img src="http://localhost:9002/src/assets/img/Logo2.png" style={{ width: "15%" }} />
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modificar Cita Recogida
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col xs={12} md={12} lg={12}>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header id="card-modal">
                                            <Accordion.Toggle id="card-button" as={Button} eventKey="0">
                                                Resumen
                                    </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <div className="row" >
                                                    <div className="col-6 col-sm-6 " >
                                                        <ul>
                                                            <li>Nit: {props.data_details.material} </li>
                                                            <li>Documento fabricacion: {props.data_details.orden}</li>
                                                            <li>Codigo material: {props.data_details.cod_material}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-6 col-sm-6 " >
                                                        <div id="cbox">
                                                            <input className="m-3" type="checkbox" id="cbox" defaultChecked={true}/> <label htmlFor="cbox">Transporte propio?</label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header id="card-modal">
                                            <Accordion.Toggle id="card-button" as={Button}  >
                                                Resultado
                                    </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse >
                                            <Card.Body></Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="secondary" onClick={handleConfirm}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSave

