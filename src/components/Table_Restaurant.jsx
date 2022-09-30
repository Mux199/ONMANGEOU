const Table_Restaurant = ({ data }) => {
    return (
        <table>
            <tbody>
            <tr>
                <th>Nom</th>
                <th>Numéro de Téléphone</th>
                <th>Adresse</th>
                <th>Email</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.tel}</td>
                    <td>{item.adresse}</td>
                    <td>{item.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table_Restaurant;