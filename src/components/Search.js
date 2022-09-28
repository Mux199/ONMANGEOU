import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import {Row, Col, Container, Table} from "reactstrap";
import "./Search.css"
import {Restaurant} from "./restaurant";

function Search(){
    ///////////////////////SEARCH ON A DATATABLE
   const [query, setQuery] = useState("");
   const keys = ["first_name", "last_name", "email"];
   const search = (data) => {
     return data.filter((item) =>
       keys.some((key) => item[key].toLowerCase().includes(query))
     );
   };
 return (
   <div className="app">
       <input
         className="search"
         placeholder="Trouvez votre Restaurant"
         onChange={(e) => setQuery(e.target.value.toLowerCase())}
       />
     {<Table data={Search(Restaurant)} />}
   </div>
 );

}

///////////////////// API SEARCH

/*function App() {
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