import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import Table_Restaurant from "./Table_Restaurant";
import "../styles/components/_search.scss"
//import {Restaurant} from "../assets/Data-example/restaurants.json";
const Restaurant = require("../assets/Data-example/restaurants.json");

function Srch(){
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState("");
    const [querySpecialite, setQuerySpecialite] = useState("Tous");
    const [query, setQuery] = useState("Tous");



    // const [queryPrix, setQueryPrix] = useState("");
    const keys = ["name", "adresse", "phone", "Spécialité", "prix"];
    const search = (data) => {
        if (querySpecialite && queryPrix){
            return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase())
        }
        return [];
    }
        /* if (query) {
            if(querySpecialite && query) {
                if (querySpecialite && queryPrix && query) {
                    return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase() && item.name.toLowerCase().includes(query))
                }
                return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase() && item.name.toLowerCase().includes(query))
            }
            if (query && queryPrix){
                return data.filter(item => item.name.toLowerCase().includes(query) && item.prix.toLowerCase() === queryPrix.toLowerCase())
            }
            return data.filter(item => item.name.toLowerCase().includes(query))
        }
        if (querySpecialite) {
            if (querySpecialite && queryPrix){
                return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase())
            }
            return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase())
    }
        if (queryPrix) {
            return data.filter(item => item.prix.toLowerCase() === queryPrix.toLowerCase())
        }
        return [];
        //data.filter((item) =>
            //keys.some((key) =>
                //item[key].toLowerCase().includes(query)))

    };*/
    const specialites = Restaurant.map(rest => rest.Spécialité);
    const uniqueSpecialites = [...new Set(specialites)];
    const prix = Restaurant.map(rest => rest.prix);
    const uniquePrix = [...new Set(prix)];
    return (
        <div className="app">
            <input
                className="search"
                placeholder="Trouvez votre Restaurant"
                onChange={(e) => {
                    setQuery(e.target.value.toLowerCase())
                }}
            />
            <select
                onChange={(e) => {
                    setQuerySpecialite(e.target.value.toLowerCase())
                }}
            >
                <option value="Tous">
                    Tous
                </option>
                {uniqueSpecialites.map(specialite => (
                    <option value={specialite}>
                        {specialite}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) =>
                    setQueryPrix(e.target.value.toLowerCase())}
            >
                <option value="Tous">
                    Tous
                </option>
                {uniquePrix.map(prix => (
                    <option value={prix}>
                        {prix}
                    </option>
                ))}
            </select>

            {<Table_Restaurant data={search(Restaurant)} />}
        </div>
    );

}

///////////////////// API SEARCH

/*function Srch() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:5000?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);

    return (
        <div className="app">
            <input
                className="search"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            {<Table data={data} />}
        </div>
    );
}*/

export default Srch;