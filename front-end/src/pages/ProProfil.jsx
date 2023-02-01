import {React, useEffect} from "react";
import { useState } from "react";
import TABLE_RESERVATION from "../components/TABLE_RESERVATION";
import Reservation from "../assets/reservation.json";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 export default function ProProfil(){
     const [startDate, setStartDate] = useState(new Date());
     const [endDate, setEndDate] = useState(null);

    const [query, setQuery] = useState("Tous");
    const [filterData, setFilterData] = useState(Reservation);

     useEffect(() => {
         let result = [...Reservation];
         //filtre barre de recherche (id,nom,mail,téléphone)
         if (query) {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase()) || item.phone.toLowerCase().includes(query.toLowerCase()) || item.email.toLowerCase().includes(query.toLowerCase()) );
         }
         //filtre
         if (startDate && endDate) {
                     result = result.filter((item) => startDate <= item.date && item.date <= endDate);
         }
         setFilterData(result);

     }, [query,startDate, endDate,])

    return (
        <div className="app">
            <input
                className="search"
                placeholder="Trouvez la Réservation"
                onChange={(e) => {
                    setQuery(e.target.value.toLowerCase())
                }}
            />
            <DatePicker
                selected={startDate}
                onChange={date => {
                    setStartDate(date);
                    setEndDate(null);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
            />
            <TABLE_RESERVATION data={filterData}/>
            </div>

        )
     }
