import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';


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
                        <h1>Esto es una single spa</h1>
                    </div>
                </Provider> :
                <div>EL store no ha sido iniciado </div>}
        </div>
    )
  }

}

export default App;
