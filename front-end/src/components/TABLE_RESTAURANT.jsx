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
import { useSelector } from "react-redux";
import Modal from "./Modal";

export default function Table_Restaurant ({ data }) {

      const userData = useSelector((state) => state.rootReducer.userReducer);
      const [actualUserData, setActualUserData] = useState({
        _id: userData && userData.users ? userData.users._id : "",
        role: userData && userData.users ? userData.users.role : "",
      });
      const [showModal, setShowModal] = useState(false);
      const [value, setValue] = useState("");
    
      const handleValueChange = (e) => setValue(e.target.value);
    
      useEffect(() => {
        if (userData && userData.users) {
          setActualUserData({
            _id: userData.users._id,
            role: userData.users.role,
          });
        }
      }, [userData]);
    
    const handleLink = function (event, itemId) {
        //event.preventDefault();
        console.log(event)
        console.log("actualUserData")
        console.log(actualUserData)
        if (actualUserData.role !== "user") {
            console.log("dans le if ")
            console.log(!actualUserData.role)
            console.log(actualUserData.role !== "user")
            setShowModal(true);
        } else {
            console.log("dans le else ")
            setShowModal(false);
            window.location.assign("/book?id=" + itemId);

            console.log("after dans le else ")
        }
    }

    return (
        <>
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
                                <TableCell><><button onClick={(event) => handleLink(event, item._id)}>Réservez</button></></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <p>Veuillez vous connecter en tant qu'utilisateur</p>
                <button onClick={() => setShowModal(false)}>Close</button>
            </Modal>
        </>
    );
}

