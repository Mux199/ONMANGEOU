import React, {useState,useEffect} from "react";
import Table_Restaurant from "./Table_Restaurant";
import "../styles/components/_search.scss"
import Restaurant from "../assets/restaurants.json";

function Search() {
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState("");
    const [querySpecialite, setQuerySpecialite] = useState("Tous");
    const [query, setQuery] = useState("Tous");

   /* const search = (data) => {
    if (querySpecialite && queryPrix) {
        return data.filter(item => item.Spécialité.toLowerCase() === querySpecialite.toLowerCase() && item.prix.toLowerCase() === queryPrix.toLowerCase())
    }
    return [];
}*/

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
    useEffect(() => {
        let data = [...query];
        if(querySpecialite) {
            data = data.filter(item => item.Spécialité === querySpecialite);
        } else if(queryPrix) {
            data = data.filter(item => item.prix === queryPrix);
        } else if(query) {
            data = data.filter(item => item.name.toLowerCase().includes(query))
        }

    }, [queryPrix, query, querySpecialite]);

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

        {<Table_Restaurant data={Restaurant}/>}
    </div>
)


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

export default Search;
