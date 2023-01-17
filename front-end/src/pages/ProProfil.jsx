import {React, useEffect} from "react";
import SideBar from "../components/SideBar"
import { useState } from "react";
import { Label } from "reactstrap";
import Reservation from "../assets/reservation.json";
import Table_Reservation from "../components/Table_Reservation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 export default function ProProfil(){
     const [startDate, setStartDate] = useState(new Date());
     const [endDate, setEndDate] = useState(new Date());

    const [query, setQuery] = useState("Tous");
    const [filterData, setFilterData] = useState(Reservation);

     useEffect(() => {
         let result = [...Reservation];
         //filtre barre de recherche (id,nom)
         if (query) {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()) || item.id.toLowerCase().includes(query.toLowerCase()) || item.phone.toLowerCase().includes(query.toLowerCase()) || item.email.toLowerCase().includes(query.toLowerCase()) );
         }
         if (startDate && endDate ) {
                     result = result.filter((item) => startDate <= item.date && item.date <= endDate);
         }
         setFilterData(result);

     }, [query,startDate, endDate])

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
                    onChange={date => setStartDate(date)}
                    minDate={new Date()}
                />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                minDate={new Date()}
            />
            <Table_Reservation data={filterData}/>
            </div>

        )
     }