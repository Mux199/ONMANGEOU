import React, {useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TABLE_RESERVATION ({ data }) {
    let userResa= {};
    return (
        <TableContainer className="table_resa" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {data && data.role && data.role=="user" ? (<>
                        <TableCell>Restaurant</TableCell>
                        <TableCell>Date de réservation</TableCell>
                        <TableCell>Heure</TableCell>
                        <TableCell>Nombre de Personnes</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Statut</TableCell>
                        {/*<TableCell>Annuler</TableCell>*/}
                        </>):(<>
                        <TableCell>Date de réservation</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Nombre de Client</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Statut</TableCell>
                        </>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.data && data.data.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            {data && data.role && data.role=="user" ? (<>
                            <TableCell>{ data && data.restaus && data.restaus.map((resto)=>{if(resto._id == item.restaurant) {return (<div>{resto.name}</div>)}})}</TableCell>
                            <TableCell>{item.date.substr(0, 10)}</TableCell>
                            <TableCell component="th" scope="row">
                                {item.hours}
                            </TableCell>
                            <TableCell>{item.nbClients}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.statut}</TableCell>
                            {/*<TableCell><button>Annulez</button></TableCell>*/}
                            </>):(<>
                            { data && data.users && data.users.map((user)=>{console.log(user);if(user._id == item.user) {console.log(user);userResa = user;}})}
                            <TableCell>{item.date.substr(0, 10)}</TableCell>
                            <TableCell>{userResa.lastname}</TableCell>
                            <TableCell>
                                {item.nbClients}
                            </TableCell>
                            <TableCell>{userResa.telephone}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.statut}</TableCell>
                            {/*<TableCell><button>Annulez</button></TableCell>*/}</>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

