import React, { Component } from 'react';
import './errorsStyle.css'

class errors extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
       
        const { MsgErrorData } = this.props; 

        let ErrorGeneric = ''

        if (MsgErrorData.length > 1) {

            ErrorGeneric = <div className="col-12 m-4" id="errors" >
                <div className="col-12">
                    <h6><strong>{MsgErrorData}</strong></h6>
                </div>
            </div >
        }

        return (<div >{ MsgErrorData.length > 1 ? ErrorGeneric: ''}  </div >);
    }

}

export default errors;