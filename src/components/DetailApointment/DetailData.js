import React from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
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
            <div className="row">
                <div className="col-3 ">
                    <img src="http://localhost:9002/src/assets/img/Logo2.png"/>
                    
                </div> 
            </div>
            {/* {<QRCode value="492" renderAs="svg" size={50}/>} */}
        </div>
    )
}


export default DetailData
