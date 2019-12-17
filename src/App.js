import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux';
import ModalPrint from './components/Modals/modalPrint/index'
import TableApointments from './components/tableApointments/index'
import SearchApointments from './components/searchApointments/index'
import DataApointements from './services/data'
import DetailsApointments from './components/DetailApointment/index'
import { ButtonGroup, Button, Form, ToggleButton } from 'react-bootstrap'
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { FaTrashAlt, FaPrint } from "react-icons/fa";
import { jsonDelete } from './services/models/deleteApointment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader';
import Errors from './components/errors/index';

const PERMISSIONS_TO_DELETE = process.env.REACT_PERMISSIONS_TO_DELETE;
const PERMISSIONS_TO_PRINT = process.env.REACT_PERMISSIONS_TO_PRINT;
const URL_IMAGE = process.env.REACT_APP_ROOT_IMAGES

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
      modalShow: false,
      editable: true,
      total: 0,
      cantDelivery: [],
      MsgErrorData: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.printOrder = this.printOrder.bind(this);
    this.handleEditable = this.handleEditable.bind(this)
    this.handleOnChangeInputs = this.handleOnChangeInputs.bind(this);
    this.handleDeleteApointment = this.handleDeleteApointment.bind(this);
    this.handleOnChangeBox = this.handleOnChangeBox.bind(this);
    this.ChangeValueObservation = this.ChangeValueObservation.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    // console.log('se cambio algo');
    // console.log('prev props', prevProps);
    // console.log('prev state', prevState.data_details, this.state.data_details);
    if (
      this.state.editable !== prevState.editable
    ) {

    }

  }

  handleDeleteApointment(id) {
    const Swal = require('sweetalert2');
    let alert =
      Swal.fire({
        title: '¿Está seguro de eliminar esta cita?',
        text: "Seleccione su respuesta",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0069b4',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {

        if (result.value) {
          this.handleCharging();
          DataApointements.getDetails(id).then(res => {
            let details = res;

            if (!details.doc_compra) {
              this.showAlert(false, 'Cita sin documento de compra.');
              return;
            }

            let body = jsonDelete;
            body.PRODUCCION.CABECERA.nit = details.nit.toString();
            body.PRODUCCION.CABECERA.doc_compra = details.doc_compra.toString();
            body.PRODUCCION.CABECERA.consecutivo_ord_procesa = details.ord_proceso.toString();
            body.PRODUCCION.CABECERA.material = details.cod_material.toString();

            DataApointements.deleteApointment(body).then(res => {
              let Answer = res.data.Resp_MT_PORTALPROVEEDOR_ELIMINARPRODUCCION27.RETORNO.retorno;
              if (Answer.substring(Answer.length, 16) == "se eliminó correctamente") {
                this.showAlert(true, Answer);
              } else {
                this.showAlert(false, Answer);
              }
            })
          })
        }
      })
  }

  showAlert = (showSaveCorrect, msg) => {
    const Swal = require('sweetalert2');
    let alert;
    if (showSaveCorrect) {
      alert =
        Swal.fire({
          type: 'success',
          title: 'Exito !',
          text: msg
        }).then((result) => {
          location.reload();
        })
    } else {
      alert =
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: msg,
          footer: '<a>Si tienes dudas comunicate con el adminsitrador.</a>'
        });
    }
    return (alert);
  }

  handleCharging() {
    const Swal = require('sweetalert2');
    let alert =
      Swal.fire({
        title: 'PROCESANDO',
        imageUrl: URL_IMAGE + "load.gif",
        imageWidth: 170,
        imageHeight: 130,
        showCancelButton: false,
        showConfirmButton: false
      })
  }

  handleOnChangeBox = e => {
    let newData = this.state.data_details;
    let value = e.target.value;
    let id = e.target.id;
    //  console.log(id, value);

    if (id === "bolsas")
      newData.bolsas = value;
    if (id === "tulas")
      newData.tulas = value;
    if (id === "cajas")
      newData.cajas = value;

    this.setState({
      data_details: newData
    })
  }

  handleOnChangeInputs = e => {
    let newData = this.state.data_details;
    let value = e.target.value;
    let index = e.target.name;
    let cont = 0;
    let cantMax = parseInt(newData.table[index].cantidad_maxima) + parseInt(newData.table[index].cantidad_entregar) + parseInt(newData.table[index].cantidad_pendiente)
    //  console.log(cantMax);

    if (value === "") {
      value = 0;
      newData.table[index].cantidad_confirmada = value;
    } else if (value > cantMax) {
      toast.error('Supera la cantidad máxima permitida a entregar')
      event.target.value = cantMax
    } else {
      newData.table[index].cantidad_confirmada = value;
    }

    newData.table.map((data, index) => {
      cont = cont + parseInt(data.cantidad_confirmada);
    })

    this.setState({
      data_details: newData,
      total: cont
    })
  }

  ChangeValueObservation = (text) => {
    let newData = this.state.data_details;   
    newData.observacion = text;
    console.log('newData: ', newData);
    this.setState({
      data_details: newData
    })
  }

  handleEditable = () => {

    //this.state.editable ? this.setState({editable: false}) : this.setState({editable: true});
    let data_editable = this.state.data_table
    data_editable.columns.pop()
    for (const key in data_editable.rows) {
      if (data_editable.rows.hasOwnProperty(key)) {
        data_editable.rows.pop();

      }
    }
    this.setState({ data_table: data_editable, editable: false })
  }

  handleClick = (id) => {
    DataApointements.getDetails(id).then(res => {
      let cont = 0;
      console.log('RESPUESTA DE HADLECLICK: ', res);

      res.table.map((data, index) => {
        cont = cont + parseInt(data.cantidad_confirmada);

      })
      // console.log(res);
      this.setState({
        selected: true,
        details_table: res.table,
        data_details: res,
        print: true,
        total: cont
      })
    })
  }

  printOrder = (id) => {
    DataApointements.getDetails(String(id)).then(res => {
      let cont = 0;
      res.table.map(data => {
        cont = cont + parseInt(data.cantidad_confirmada);

      })

      this.setState({
        selected: true,
        details_table: res.table,
        data_details: res,
        modalShow: true,
        total: cont,
      })
    })

  }

  getPermmision(item) {
    let data = JSON.parse(localStorage.getItem("moduleApp"))
    return data.acciones.filter(word => word.asegurableid == item).length > 0
  }


  componentDidMount() {

    const id = JSON.parse(localStorage.vuex).auth.applications[0].data.documentoIdentidad
    // console.log('auth: ', JSON.parse(localStorage.vuex).auth);

    let Disabled_Print = true;
    let Disabled_Delete = true;

    if (this.getPermmision(PERMISSIONS_TO_PRINT)) {
      Disabled_Print = false;
    }

    if (this.getPermmision(PERMISSIONS_TO_DELETE)) {
      Disabled_Delete = false;
    }

    DataApointements.getData(String(id)).then(data => {
      // console.log('data: ', data);

      if(!data){
        this.setState({
          MsgErrorData: 'No hay conexión con el servidor.'
        })
        return;
      }

      if(!data.data[0]){
        this.setState({
          MsgErrorData: 'No hay conexión con el servidor'
        })
        return;
      }

      // if (data) {
      if (data.data[0]) {
        for (const key in data.data[0].rows) {
          if (data.data[0].rows.hasOwnProperty(key)) {
            let element = data.data[0].rows[key];
            let fun = {
              Opciones: <ButtonGroup toggle>
                <Form.Check
                  custom
                  name="SelectItem"
                  type="radio"
                  id={String(data.data[0].rows[key].Order)}
                  label
                  onClick={() => this.handleClick(String(data.data[0].rows[key].Order))}
                />
                {/* <ToggleButton type="checkbox"  variant="outline-secondary" value={data[0].rows[key].Order} id={data[0].rows[key].Order} onClick={() => this.printOrder(data[0].rows[key].Order)}></ToggleButton> */}
                {<Button variant="secondary" className="ml-1 " value={data.data[0].rows[key].Order} id={data.data[0].rows[key].Order} onClick={() => this.printOrder(data.data[0].rows[key].Order)} disabled={Disabled_Print} ><FaPrint /></Button>}

                {<Button variant="secondary" className="ml-1" id={data.data[0].rows[key].Order} onClick={() => this.handleDeleteApointment(data.data[0].rows[key].Order)} disabled={Disabled_Delete}><FaTrashAlt /></Button>}
              </ButtonGroup>
            }
            element = Object.assign(element, fun)
          }
        }

        this.setState({
          data_table: data.data[0],
          isData: true,
        })
      }
      else {
        this.setState({
          MsgErrorData: 'No tiene citas pendientes.'
        })
      }


    })
  }


  render() {

    const { store, modalShow, globalEventDistributor, isData, data_table,
      details_table, selected, data_details, editable, cantDelivery, total, MsgErrorData } = this.state
    return (

      <div className="container-fluid">
        {store && globalEventDistributor ?
          <Provider store={this.state.store}>
            <PrintProvider>
              <div className="row">

                {(!isData && !MsgErrorData.length > 0) && <div className="first">
                  <div className="second">

                    <img src={URL_IMAGE + "load.gif"}
                      alt="Procesando"
                      width="200"
                      height="141"></img>

                  </div>
                </div>}

                {(MsgErrorData.length > 0) && <Errors MsgErrorData={this.state.MsgErrorData} />}

                {(isData && !MsgErrorData.length > 0) &&
                  <div className="col-lg-7 -col-sm-12 -col-xs" id="searchComp">
                    <NoPrint>
                      <SearchApointments />
                      {isData ? <TableApointments data_table={data_table} /> : <h1>No hay ordenes para poder agendar cita</h1>}
                    </NoPrint>
                  </div>}
                {(isData && !MsgErrorData.length > 0) &&
                  <div className="col-lg-5 -col-sm-12 -col-xs" id="detail">
                    <DetailsApointments
                      editable={editable}
                      onClickEditable={this.handleEditable}
                      selected={selected}
                      printable='section-to-print'
                      data_details={data_details}
                      cantDelivery={cantDelivery}
                      total={total}
                      OnChangeInputs={this.handleOnChangeInputs}
                      OnChangeBox={this.handleOnChangeBox}
                      ChangeValueObservation = {this.ChangeValueObservation}
                    />
                  </div>}

              </div>

              {selected ? <ModalPrint
                show={modalShow}
                details_table={details_table}
                selected={selected}
                data_details={data_details}
                onHide={() => this.setState({ modalShow: false })} /> : ''}
              <ToastContainer />
            </PrintProvider>

          </Provider> :
          <div>EL store no ha sido iniciado </div>}
      </div>
    )
  }

}

export default App;
