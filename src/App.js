import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';

import SearchApointments from './components/searchApointments/index'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        store: this.props.store,

        globalEventDistributor: this.props.globalEventDistributor,  
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  } 

  
  render() {
    const {store,globalEventDistributor } = this.state
    return (
        <div className="container-fluid">
            {store && globalEventDistributor ?
                <Provider store={this.state.store}>
                    <div className="row">
                      <div className="col-7" id="searchComp">
                        <SearchApointments />
                        {/* { isData ? <TableOrders dataTable={dataTable}/> : <h1>No hay ordenes para poder agendar cita</h1> } */}
                      </div>
                    </div>
                </Provider> :
                <div>EL store no ha sido iniciado </div>}
        </div>
    )
  }

}

export default App;
