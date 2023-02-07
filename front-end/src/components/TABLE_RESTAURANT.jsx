import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Table_Restaurant ({ data }) {
    const userData = useSelector((state) => state.rootReducer.userReducer);
    const dispatch = useDispatch();
    const [myUserData, setMyUserData] = useState(userData);
    
    useEffect(() => {
        setMyUserData(userData);
      }, []);

    const handleLink = function (event) {
        console.log(event)
        console.log("click handlelink")
        console.log(event.target.value)
    }
    console.log("restaurant id ")
    console.log("restaurant id ")

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Ville</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Spécialité</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Adresse</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell>{item.note}⭐</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.priceRange}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.telephone}</TableCell>
                            <TableCell>{item.adresse}</TableCell>
                            <TableCell><img height="144" width="256" src={`${process.env.PUBLIC_URL}/assets/img/resto/${item.img}`}
                                            alt={`/asset/img/resto/${item.img}`}/></TableCell>
                            <TableCell><><Link to={"/book"} state={item._id} onClick={handleLink}><button>Réservez</button></Link></></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

