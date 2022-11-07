import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Table_Restaurant ({ data }) {
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
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell>{item.note}⭐</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.prix}</TableCell>
                            <TableCell>{item.speciality}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.adresse}</TableCell>
                            <TableCell><img height="144" width="256" src={`${process.env.PUBLIC_URL}/assets/img/resto/${item.img}`}
                                            alt={`/asset/img/resto/${item.img}`}/></TableCell>
                            <TableCell><button>Réservez</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

