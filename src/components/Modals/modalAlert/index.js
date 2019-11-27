import React, { useState } from 'react';
import {Modal, Container, Row, Col,Button,ButtonToolbar,Table,Form, } from 'react-bootstrap'

function ModalAlert(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        setShow(false);
        window.location.reload(false);
    };
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button className="ml-5" variant="secondary" onClick={handleShow} disabled={props.editable}>Cancelar</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> <img src="http://localhost:9002/src/assets/img/Logo2.png" style={{width:"50%"}}/></Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Desea descartar los cambios realizados?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ModalAlert
  
