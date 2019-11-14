import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';
import ModalPrint from './components/Modal/index'
import TableApointments from './components/tableApointments/index'
import SearchApointments from './components/searchApointments/index'
import DataApointements from './services/data'
import DetailsApointments from './components/DetailApointment/index'
import {ButtonGroup, Button, ToggleButton} from 'react-bootstrap'
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import ReactToPrint from "react-to-print";





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        store: this.props.store,
        data_table: [],
        globalEventDistributor: this.props.globalEventDistributor,
        isData: false,
        selected: false,
        del: "disabled",
        data_details: {},
        details_table: [],
        modalShow: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.printOrder = this.printOrder.bind(this)

  }

  componentDidCatch(error, info) {
    console.log(error, info);
  } 


  handleClick = e =>{
    e.persist();
    const { value, id } = e.target;
   
    if(value){

    }else{
      DataApointements.getDetails(id).then(res =>{
        this.setState({
          selected: true,
          details_table: res.table,
          data_details: res,
          print: true
        })
      })
    }
    
  }

  printOrder = (id) => {
    DataApointements.getDetails(id).then(res =>{
      this.setState({
          selected: true,
          details_table: res.table,
          data_details: res,
          modalShow: true
      })
    })

  }

  // handlePrint = e =>{
   
    
  // }

  

  componentDidMount() {
    DataApointements.getData().then(data =>{
        for (const key in data[0].rows) {
            if (data[0].rows.hasOwnProperty(key)) {
              let element = data[0].rows[key];
              let fun = {Opciones: <ButtonGroup toggle>
                  <ToggleButton type="checkbox"  variant="outline-secondary" value={data[0].rows[key].Order} id={data[0].rows[key].Order} onClick={this.handleClick}></ToggleButton>
                  <Button  href="#" variant="secondary" className="ml-1 circle" value={data[0].rows[key].Order} id={data[0].rows[key].Order}  onClick={() => this.printOrder(data[0].rows[key].Order)} >imp</Button>
                       
                  <Button variant="danger" className="ml-1" >del</Button>
              </ButtonGroup>}
              element = Object.assign(element, fun)
            }
        }
        
        this.setState({
            data_table: data[0],
            isData: true,
        })
        
    })
  }

  
  render() {
    
    const {store,modalShow, globalEventDistributor, isData, data_table, details_table, selected, data_details } = this.state
    return (
      
        <div className="container-fluid">
            {store && globalEventDistributor ?
                <Provider store={this.state.store}>
                  <PrintProvider>
                    <div className="row">
                      <div className="col-7" id="searchComp">
                        <NoPrint>
                          <SearchApointments />
                          { isData ? <TableApointments data_table={data_table}/> : <h1>No hay ordenes para poder agendar cita</h1> }
                        </NoPrint>
                      </div>
                      <div className="col-5" id="detail">
                            <DetailsApointments  selected={selected} printable='section-to-print'  details_table={details_table} data_details={data_details}/>                                                            
                      </div>
                      
                    </div>
                    
                    {selected ? <ModalPrint show={modalShow } details_table={details_table}  selected={selected} data_details={data_details} onHide={() => this.setState({modalShow: false}) }/> : ''}
                  </PrintProvider>
                    
                </Provider> :
                <div>EL store no ha sido iniciado </div>}
        </div>
    )
  }

}

export default App;
