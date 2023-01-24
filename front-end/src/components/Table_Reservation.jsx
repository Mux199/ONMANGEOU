import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Table_Reservation ({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Numéro de réservation</TableCell>
                        <TableCell>Date de réservation</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Nombre de Personnes</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Adresse-mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell>{item.persons}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell><button>Supprimez</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

