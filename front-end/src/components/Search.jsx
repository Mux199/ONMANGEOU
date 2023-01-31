import React, {useState,useEffect} from "react";
import Table_Restaurant from "./Table_Restaurant"
import "../styles/components/_search.scss";
import Restaurant from "../assets/restaurants.json";
import Slider from '@mui/material/Slider';


function Search() {
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState("Tous");
    const [querySpeciality, setQuerySpeciality] = useState("Tous");
    const [querymin, setQuerymin] = useState(1);
    const [querymax, setQuerymax] = useState(5);
    const [query, setQuery] = useState("");
    const [queryCity, setQueryCity] = useState("Tous");
    const [filterData, setFilterData] = useState(Restaurant);

    const Specialitys = Restaurant.map(rest => rest.speciality);
    const uniqueSpecialitys = [...new Set(Specialitys)];
    const prix = Restaurant.map(rest => rest.prix);
    const uniquePrix = [...new Set(prix)];
    const city = Restaurant.map(rest => rest.city);
    const uniqueCity = [...new Set(city)];

    //label pour Range Slider
    const customMarks = [
        {
            value: 1,
            label: '1⭐',
        },
        {
            value: 2,
            label: '2⭐',
        },
        {
            value: 3,
            label: '3⭐',
        },
        {
            value: 4,
            label: '4⭐',
        },
        {
            value: 5,
            label: '5⭐',
        },
    ];

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
        if (querymin && querymax) {
            result = result.filter((item) => querymin <= item.note && item.note <= querymax);
        }
        setFilterData(result);

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
<br/>
<box className={"Slider_Note"}>
            <Slider

                value={[querymin,querymax]}
                min={1}
                max={5}
                onChange={(event, newValue) =>
                    setQuerymax(newValue[1])
                }
                onChangeCommitted={(event, newValue) =>
                    setQuerymin(newValue[0])
                }
                marks={customMarks}
                valueLabelDisplay="auto"
            />
</box>
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