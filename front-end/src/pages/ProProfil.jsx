import {React, useEffect} from "react";
import SideBar from "../components/SideBar"
import { useState } from "react";
import { Label } from "reactstrap";
import Restaurant from "../assets/restaurants.json";
import Table_Reservation from "../components/Table_Reservation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 export default function ProProfil(){
     const [startDate, setStartDate] = useState(new Date());

    const [query, setQuery] = useState("Tous");
     const [date, setQueryDate] = useState("Tous");
    const [filterData, setFilterData] = useState(Restaurant);

     useEffect(() => {
         let result = [...Restaurant];
         //filtre barre de recherche (id,nom)
         if (query) {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()));
         }
         if (startDate != "") {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()));
         }
         setFilterData(result);

     }, [query,startDate])

    return (
        <div className="app">
            <input
                className="search"
                placeholder="Trouvez la Réservation"
                onChange={(e) => {
                    setQuery(e.target.value.toLowerCase())
                }}
            />
                <DatePicker>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                    />
                </DatePicker>
            <Table_Reservation data={filterData}/>
            </div>

        )
     }