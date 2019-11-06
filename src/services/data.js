
class DataApointements{
    static async getData(){
        try {     
            const response = await fetch('http://localhost:3000/apointments');
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.log('hola', error);
        }
    }

}

export default DataApointements;