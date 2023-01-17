import {React, useEffect} from "react";
import SideBar from "../components/SideBar"
import { useState } from "react";
import { Label } from "reactstrap";
import Restaurant from "../assets/restaurants.json";
import Table_Reservation from "../components/Table_Reservation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 export default function ProProfil(){
     const ChooseDate = () => {
         const [startDate, setStartDate] = useState("");}

    const [query, setQuery] = useState("Tous");
     const [date, setQueryDate] = useState("Tous");
    const [filterData, setFilterData] = useState(Restaurant);

     useEffect(() => {
         let result = [...Restaurant];
         //filtre barre de recherche (id,nom)
         if (query) {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()));
         }
         if (ChooseDate != "") {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()));
         }
         setFilterData(result);

     }, [query,ChooseDate])

    return (
        <div className="app">
            <input
                className="search"
                placeholder="Trouvez la Réservation"
                onChange={(e) => {
                    setQuery(e.target.value.toLowerCase())
                }}
            />
            <select
                onChange={(e) => {
                    setQueryDate(e.target.value)
                }}
            >
                <option value={"Tous"}>
                    Date
                </option>
                {Date.map(dates => (
                    <option value={date}>
                        {date}
                    </option>
                ))}
                </select>
            <Table_Reservation data={filterData}/>
            </div>

        )
     }