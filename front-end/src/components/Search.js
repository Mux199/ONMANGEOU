import React, {useState,useEffect} from "react";
import Table_Restaurant from "./Table_Restaurant";
import "../styles/components/_search.scss"
import Restaurant from "../assets/restaurants.json";

function Search() {
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState(null);
    const [querySpeciality, setQuerySpeciality] = useState(null);
    const [query, setQuery] = useState("");

    const search = (data) => {

        if (query) {
            if (querySpeciality && query) {
                if (querySpeciality && queryPrix && query) {
                    return data.filter(item => item.speciality.toLowerCase() === querySpeciality.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase() && item.name.toLowerCase().includes(query))
                }
                return data.filter(item => item.speciality.toLowerCase() === querySpeciality.toLowerCase() && item.name.toLowerCase().includes(query))
            }
            if (query && queryPrix) {
                return data.filter(item => item.name.toLowerCase().includes(query) && item.prix.toLowerCase() === queryPrix.toLowerCase())
            }
            return data.filter(item => item.name.toLowerCase().includes(query))
        }
        if (querySpeciality) {
            if (querySpeciality && queryPrix) {
                return data.filter(item => item.speciality.toLowerCase() === querySpeciality.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase())
            }
            return data.filter(item => item.speciality.toLowerCase() === querySpeciality.toLowerCase())
        }
        if (queryPrix) {
            return data.filter(item => item.prix.toLowerCase() === queryPrix.toLowerCase())
        }
        return Restaurant;


    };

const Specialitys = Restaurant.map(rest => rest.speciality);
const uniqueSpecialitys = [...new Set(Specialitys)];
const prix = Restaurant.map(rest => rest.prix);
const uniquePrix = [...new Set(prix)];
   /* useEffect(() => {
        let data = [...Restaurant];
        if(querySpeciality) {
            data = Restaurant.filter(item => item.Speciality === querySpeciality);
        }
        if(queryPrix) {
            data = Restaurant.filter(item => item.prix === queryPrix);
        }
        if(query) {
            data = Restaurant.filter(item => item.name.toLowerCase().includes(query))
        }

    }, [queryPrix, query, querySpeciality]);*/

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
                setQuerySpeciality(e.target.value.toLowerCase())
            }}
        >
            <option value={"Tous"}>
                Tous
            </option>
            {uniqueSpecialitys.map(speciality => (
                <option value={speciality}>
                    {speciality}
                </option>
            ))}
        </select>
        <select
            onChange={(e) =>
                setQueryPrix(e.target.value.toLowerCase())}
        >
            <option value={"Tous"}>
            Tous
            </option>
            {uniquePrix.map(prix => (
                <option value={prix}>
                    {prix}
                </option>
            ))}
        </select>


        {<Table_Restaurant data={search(Restaurant)}/>}
    </div>
)}
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

export default Search;
