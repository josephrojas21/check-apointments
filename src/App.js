import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';
import TableApointments from './components/tableApointments/index'
import SearchApointments from './components/searchApointments/index'
import DataApointements from './services/data'
import DetailsApointments from './components/DetailApointment/index'
import {ButtonGroup, Button, ToggleButton} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        store: this.props.store,
        dataTable: [],
        globalEventDistributor: this.props.globalEventDistributor,
        isData: false,
        selected: false,
        dataDetails: {},
        detailsTable: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  } 


  handleClick = e =>{
    e.persist();
    const { value, id } = e.target;
   
    console.log(value,id );
    if(value){

    }else{
      console.log('entro a esta');
      
      DataApointements.getDetails(id).then(res =>{
        this.setState({
          selected: true,
          detailsTable: res.table,
          dataDetails: res
        })
      })
    }
    
  }

  

  componentDidMount() {
    DataApointements.getData().then(data =>{
        for (const key in data[0].rows) {
            if (data[0].rows.hasOwnProperty(key)) {
              let element = data[0].rows[key];
              let fun = {Opciones: <ButtonGroup toggle>
                  <ToggleButton type="checkbox"  variant="outline-secondary" value={data[0].rows[key].Order} id={data[0].rows[key].Order} onClick={this.handleClick}></ToggleButton>
                  <Button variant="secondary" className="ml-1 circle">imp</Button>
                  <Button variant="danger" className="ml-1">del</Button>
              </ButtonGroup>}
              element = Object.assign(element, fun)
            }
        }
        
        this.setState({
            dataTable: data[0],
            isData: true,
        })
        
    })
  }

  
  render() {
    
    const {store, globalEventDistributor, isData, dataTable, detailsTable, selected, dataDetails } = this.state
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
                            <DetailsApointments selected={selected} detailsTable={detailsTable} dataDetails={dataDetails}/>                                                            
                      </div>
                      
                    </div>
                </Provider> :
                <div>EL store no ha sido iniciado </div>}
        </div>
    )
  }

}

export default App;
