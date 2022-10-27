import React, {useState,useEffect} from "react";
import Table_Restaurant from "./Table_Restaurant";
import "../styles/components/_search.scss";
import Restaurant from "../assets/restaurants.json";
import ReactSlider from "react-slider";

function Search() {
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState("Tous");
    const [querySpeciality, setQuerySpeciality] = useState("Tous");
    const [querymin, setQuerymin] = useState(1);
    const [querymax, setQuerymax] = useState(5);
    const [query, setQuery] = useState("");
    const [queryCity, setQueryCity] = useState("Tous");
    const [filterData, setFilterData] = useState([]);

    const Specialitys = Restaurant.map(rest => rest.speciality);
    const uniqueSpecialitys = [...new Set(Specialitys)];
    const prix = Restaurant.map(rest => rest.prix);
    const uniquePrix = [...new Set(prix)];
    const city = Restaurant.map(rest => rest.city);
    const uniqueCity = [...new Set(city)];

    useEffect(() => {
        let result = [...Restaurant];
        //filtre barre de recherche (ville,nom)
        if (query) {
            result = result.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.city.toLowerCase().includes(query.toLowerCase()));
        }

        //filtre bouton Prix
        if (queryPrix !== "Tous") {
            result = result.filter((item) => item.prix === queryPrix);
        }

        //filtre bouton Ville
        if (queryCity !== "Tous") {
            result = result.filter((item) => item.city === queryCity);
        }

        //filtre bouton Spécialité
        if (querySpeciality !== "Tous") {
            result = result.filter((item) => item.speciality === querySpeciality);
        }


        //filtre RangeSlider note
        if (querymax && querymin) {
            result = result.filter((item) => querymin <= item.note && item.note <= querymax);
            setFilterData(result);
        }
    }, [queryPrix, querySpeciality, query, querymax, querymin, queryCity])


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
                    setQuerySpeciality(e.target.value)
                }}
            >
                <option value={"Tous"}>
                    Spécialité
                </option>
                {uniqueSpecialitys.map(specialitys => (
                    <option value={specialitys}>
                        {specialitys}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) =>
                    setQueryPrix(e.target.value)}
            >
                <option value={"Tous"}>
                    Prix
                </option>
                {uniquePrix.map(prix => (
                    <option value={prix}>
                        {prix}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) =>
                    setQueryCity(e.target.value)}
            >
                <option value={"Tous"}>
                    Ville
                </option>
                {uniqueCity.map(city => (
                    <option value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <ReactSlider
                className={"slider"}
                trackClassName={"tracker"}
                defaultValue={(querymin,querymax)}
                min={1000}
                max={5000}
                minDistance={50}
                step={50}

                withTracks={true}
                pearling={true}
                renderThumb={(props) => {
                    return <div {...props} className = "thumb"></div>;
                }}
                renderTrack={(props) => {
                    return <div {...props} className = "track"></div>;
                }}
                onChange={([querymin, querymax]) => {
                    setQuerymax(querymax);
                    setQuerymin(querymin);
                }}
            />
            <div className="values-wrapper">
                <p>
                    Min Value:
                    <span>{querymin}</span>
                </p>
                <p>
                    Max Value:
                    <span>{querymax}</span>
                </p>
            </div>



            {<Table_Restaurant data={filterData}/>}
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