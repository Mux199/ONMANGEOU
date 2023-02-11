import React, {useState,useEffect} from "react";
import Table_Restaurant from "./TABLE_RESTAURANT";
import "../styles/components/_search.scss";
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";

function Search() {
    const restausData = useSelector((state) => state.rootReducer.restausReducer);
    const userData = useSelector((state) => state.rootReducer.userReducer);
    const dispatch = useDispatch();

    console.log("restausData")

    console.log(restausData)
    ///////////////////////SEARCH ON A DATATABLE
    const [queryPrix, setQueryPrix] = useState("Tous");
    const [querySpeciality, setQuerySpeciality] = useState("Tous");
    const [querymin, setQuerymin] = useState(1);
    const [querymax, setQuerymax] = useState(5);
    const [query, setQuery] = useState("");
    const [queryCity, setQueryCity] = useState("Tous");
    const [filterData, setFilterData] = useState(restausData);

    useEffect(() => {
        setFilterData(restausData);
      }, []);
      
      let Specialitys;
      let uniqueSpecialitys;
      let prix;
      let uniquePrix ;
      let city ;
      let uniqueCity;

    if(Array.isArray(restausData) &&
                  typeof restausData.map === "function" ) {
         Specialitys = restausData.map(rest => rest.type);
         uniqueSpecialitys = [...new Set(Specialitys)];
         prix = restausData.map(rest => rest.priceRange);
         uniquePrix = [...new Set(prix)];
         city = restausData.map(rest => rest.city);
         uniqueCity = [...new Set(city)];
    } else {
     Specialitys = [{}].map(rest => rest.type);

     uniqueSpecialitys = [...new Set(Specialitys)];

     prix = [{}].map(rest => rest.priceRange);

     uniquePrix = [...new Set(prix)];

     city = [{}].map(rest => rest.city);

     uniqueCity = [...new Set(city)];
}

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
        let result
        if(restausData){
            result = [...restausData];
        }
        
        //filtre barre de recherche (ville,nom)
        if (query) {
            result = result.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.city.toLowerCase().includes(query.toLowerCase()));
        }

        //filtre bouton Prix
        if (queryPrix !== "Tous") {
            result = result.filter((item) => item.priceRange === queryPrix);
        }

        //filtre bouton Ville
        if (queryCity !== "Tous") {
            result = result.filter((item) => item.city === queryCity);
        }

        //filtre bouton Spécialité
        if (querySpeciality !== "Tous") {
            result = result.filter((item) => item.type === querySpeciality);
        }
        console.log("ok")

        //filtre RangeSlider note
        if (querymin && querymax) {
            result = result.filter((item) => querymin <= item.note && item.note <= querymax);
        }
        setFilterData(result);

    }, [queryPrix, querySpeciality, query, querymax, querymin, queryCity, restausData])


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
         <div className={"Slider_Note"}>
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
            </div>

                {Array.isArray(restausData) &&
                  typeof restausData.map === "function" ? (<Table_Restaurant data={filterData}/>) : (<Table_Restaurant data={[]}/>)}
       </div>
    )}
export default Search;