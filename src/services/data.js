
class DataOrders{
    static async getData(){
        try {     
            const response = await fetch('http://localhost:3000');
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.log('hola', error);
        }
    }

    // static filterHotels(hotels,payload){
    //     let {dateFrom,dateTo,country,price,rooms} = payload;
    //     return hotels.filter(hotel =>{
    //         return Moment(hotel.availabilityFrom).format("YYYY-MM-DD") >= dateFrom
    //         && Moment(hotel.availabilityTo).format("YYYY-MM-DD") <= dateTo
    //         && hotel.rooms <= (rooms !== 'select' ? rooms : hotel.rooms)
    //         && hotel.price === (price !== 'select' ? parseInt(price) : hotel.price)
    //         && hotel.country.trim().toLowerCase() === (country !== 'select' ? country.trim().toLowerCase() : hotel.country.trim().toLowerCase())
    //     })
    // }
}

export default DataOrders;