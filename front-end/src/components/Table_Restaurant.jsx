const Table_Restaurant = ({ data }) => {
    return (
        <table>
            <tbody>
            <tr>
                <th>Nom</th>
                <th>Numéro de Téléphone</th>
                <th>Adresse</th>
                <th>Spécialités</th>
                <th>Prix</th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.adresse}</td>
                    <td>{item.Spécialité}</td>
                    <td>{item.prix}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table_Restaurant;