import axios from 'axios'
class DataApointements{
    static async getData(id){
        try {     
            const response = await fetch(`http://localhost:3000/apointments/${id}`);
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
            const response = await  fetch(`http://localhost:3000/apointments/detailsApointments/${id}`);
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
            const response = await fetch(`http://localhost:3000/apointments/deleteApointment`, {
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