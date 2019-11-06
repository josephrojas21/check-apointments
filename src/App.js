import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';
import TableApointments from './components/tableApointments/index'
import SearchApointments from './components/searchApointments/index'
import DataApointements from './services/data'
import DetailsApointments from './components/DetailApointment/index'
import {ButtonGroup, Button} from 'react-bootstrap'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        store: this.props.store,
        dataTable: {},
        globalEventDistributor: this.props.globalEventDistributor,
        isData: false,
        selected: "Por favor seleccione ua cita para ver detalle"
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  } 

  handleClick(order){
    this.setState({
      selected: order
    })
    console.log('hola desdee aca',order);
  }

  componentDidMount() {
    DataApointements.getData().then(data =>{
        for (const key in data.rows) {
            if (data.rows.hasOwnProperty(key)) {
                let element = data.rows[key];
                let fun = {Opciones: <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">imp</Button>
                  <Button variant="danger">del</Button>
                </ButtonGroup>,
                clickEvent: () => this.handleClick(data.rows[key].Order )}
                element = Object.assign(element, fun )
            }
        }
        console.log(data);
                  
        this.setState({
            dataTable: data,
            isData: true,
            //dataDetails: data[1]
        }) 
    })
  }

  
  render() {
    const {store, globalEventDistributor, isData, dataTable, selected } = this.state
    return (
        <div className="container-fluid">
            {store && globalEventDistributor ?
                <Provider store={this.state.store}>
                    <div className="row">
                      <div className="col-7" id="searchComp">
                        <SearchApointments />
                        { isData ? <TableApointments dataTable={dataTable}/> : <h1>No hay ordenes para poder agendar cita</h1> }
                      </div>
                      <div className="col-5" id="detail">
                            <DetailsApointments selected={selected}/>                                                            
                         
                              
                        </div>
                    </div>
                </Provider> :
                <div>EL store no ha sido iniciado </div>}
        </div>
    )
  }

}

export default App;
