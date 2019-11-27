import axios from 'axios'
const URL = process.env.REACT_APP_ROOT_API

class DataApointements{
    static async getData(id){
        try {     
            console.log(URL);
            
            const response = await fetch(`${URL}apointments/${id}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.log('hola', error);
        }
    }

    static async getDetails(id){
        try {     
            const response = await  fetch(`${URL}apointments/detailsApointments/${id}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            
            
            return json;
        } catch (error) {
            console.log('pasa algo en la peticion', error);
        }
    }

    static async deleteApointment(data){
        try {     
            const response = await fetch(`${URL}apointments/deleteApointment`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            
            
            return json;
        } catch (error) {
            console.log('pasa algo en la peticion', error);
        }
    }

    static async saveApointment(data){
        try {     
            const response = await fetch(`${URL}apointments/updatesApointment`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            
            
            return json;
        } catch (error) {
            console.log('pasa algo en la peticion', error);
        }
    }

}

export default DataApointements;