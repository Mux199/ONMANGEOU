import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import Table from "./table";
import "./Search.css"
import {Restaurant} from "./restaurant";

function Srch(){
    ///////////////////////SEARCH ON A DATATABLE
   const [query, setQuery] = useState("");
   const keys = ["name", "adresse", "tel"];
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
     {<Table data={search(Restaurant)} />}
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