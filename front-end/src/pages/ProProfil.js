import {React, useEffect} from "react";
import SideBar from "../components/SideBar"
import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { Label } from "reactstrap";
import Restaurant from "../assets/restaurants.json";
import Table_Reservation from "../components/Table_Reservation";

 export default function ProProfil(){
    const ChooseDate = () => {
        const [startDate, setStartDate] = useState(new Date());
    }

    const [query, setQuery] = useState("Tous");
    const [filterData, setFilterData] = useState(Restaurant);

     useEffect(() => {
         let result = [...Restaurant];
         //filtre barre de recherche (id,nom)
         if (query) {
             result = result.filter((item) =>  item.name.toLowerCase().includes(query.toLowerCase()));
         }

         setFilterData(result);

     }, [query])

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
                    setQuerySpeciality(e.target.value)
                }}
            >
                <option value={"Tous"}>
                    Date
                </option>
                {uniqueDate.map(dates => (
                    <option value={specialitys}>
                        {specialitys}
                    </option>
                ))}
            {<Table_Reservation data={filterData}/>}
            </div>
        )
        }
